using AutoMapper;
using WebApi.Authorization;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Bookings;
using WebApi.Models.Users;

namespace WebApi.Services
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        void RegisterCustomer(RegisterUser model);
        User GetById(int id);
        void DeleteUser(int id);
        void CreateBooking(RegisterBooking model, int id);
        IEnumerable<Booking> GetUserBookings(int id);
        Booking GetBookingById(int id);
        void DeleteBooking(Booking booking, int id);
    }
    
    public class UserService : IUserService
    {
        private readonly DataContext _context;
        private readonly IJwtUtils _jwtUtils;
        private readonly IMapper _mapper;
        
        public UserService(
            DataContext context,
            IJwtUtils jwtUtils,
            IMapper mapper)
        {
            _context = context;
            _jwtUtils = jwtUtils;
            _mapper = mapper;
        }
        
        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var user = _context.Users.SingleOrDefault(x => x.Email == model.Email);

            if (user == null)
                throw new AppException("User with that email does not exist!");
            
            if (!BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash))
                throw new AppException("Wrong password entered!");

            // authentication successful so generate jwt token
            var response = _mapper.Map<AuthenticateResponse>(user);
            response.Token = _jwtUtils.GenerateToken(user);
            return response;
        }
        
        public void RegisterCustomer(RegisterUser model)
        {
            if (_context.Users.Any(x => x.Email == model.Email))
                throw new AppException("User with this email is already registered!");
            
            if (_context.Users.Any(x => x.Phone == model.Phone))
                throw new AppException("User with this phone number is already registered!");
            
            var user = _mapper.Map<User>(model);
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password);
            user.Role = Role.Customer;
            
            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public User GetById(int id)
        {
            return GetUser(id);
        }
        
        public void DeleteUser(int id)
        {
            var user = GetUser(id);
            _context.Users.Remove(user);
            _context.SaveChanges();
        }
        
        public void CreateBooking(RegisterBooking model, int id)
        {
            var worker = _context.Users.FirstOrDefault(x => x.Id == model.WorkerId);
            if (worker == null || worker.Role != Role.Worker)
                throw new AppException("Cannot find a worker with this id");
            
            var customer = _context.Users.FirstOrDefault(x => x.Id == id);
            if (customer == null || customer.Role != Role.Customer && customer.Id != id)
                throw new AppException("Cannot find a customer with this id");

            var room = _context.Rooms.FirstOrDefault(x => x.Id == model.RoomId);
            if (room == null)
                throw new AppException("Room id does not exist!");

            var workerBooked = _context.Bookings.FirstOrDefault(
                x => (x.StartTime == DateTime.Parse(model.StartTime) && x.WorkerId == model.WorkerId));
            if (workerBooked != null)
                throw new AppException("Worker is already scheduled to work at that time!");

            var customerBooked = _context.Bookings.FirstOrDefault(
                x => (x.StartTime == DateTime.Parse(model.StartTime) && x.CustomerId == id));
            if (customerBooked != null)
                throw new AppException("Customer is already booked at that time!");
            
            var roomedBooked = _context.Bookings.FirstOrDefault(
                x => (x.StartTime == DateTime.Parse(model.StartTime) && x.RoomId == model.RoomId));
            if (roomedBooked != null)
                throw new AppException("Room is already booked at that time!");
            
            var booking = _mapper.Map<Booking>(model);
            booking.StartTime = DateTime.Parse(model.StartTime);
            booking.EndTime = DateTime.Parse(model.EndTime).AddMinutes(Convert.ToDouble(model.Duration));
            booking.CustomerId = id;
            
            _context.Bookings.Add(booking);
            _context.SaveChanges();
        }

        public Booking GetBookingById(int id)
        {
            var booking = _context.Bookings.Find(id);
            if (booking == null)
                throw new AppException("Booking with that id does not exist!");
            return booking;
        }
        
        public IEnumerable<Booking> GetUserBookings(int id)
        {
            var bookings= _context.Bookings.Where(x => x.CustomerId == id || x.WorkerId == id);
            if (bookings == null)
                throw new KeyNotFoundException("No bookings found!");
            return bookings;
        }

        public void DeleteBooking(Booking booking, int id)
        {
            if (booking == null || booking.CustomerId != id || booking.WorkerId != id)
                throw new KeyNotFoundException("No bookings found!");
            _context.Bookings.Remove(booking);
            _context.SaveChanges();
        }
        
        private User GetUser(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null)
                throw new KeyNotFoundException("User not found!");
            
            return user;
        }
    }
}
