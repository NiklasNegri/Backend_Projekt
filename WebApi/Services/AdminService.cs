using AutoMapper;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Rooms;
using WebApi.Models.Users;

namespace WebApi.Services
{
    public interface IAdminService
    {
        void RegisterAdminUser(RegisterUser model);
        IEnumerable<User> GetUsers();
        IEnumerable<User> GetUsersByRole(int role);
        User GetById(int id);
        void DeleteUser(int id);
        void RegisterRoom(RegisterRoom model);
        IEnumerable<Room> GetRooms();
        void DeleteRoom(int id);
        IEnumerable<Booking> GetAllBookings();
        Booking GetBookingById(int id);
        void DeleteBooking(int id);
    }
    
    public class AdminService : IAdminService
    {
        private DataContext _context;
        private readonly IMapper _mapper;
        public AdminService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        public void RegisterAdminUser(RegisterUser model)
        {
            var user = _mapper.Map<User>(model);
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password);
            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public void RegisterRoom(RegisterRoom model)
        {
            var room = _mapper.Map<Room>(model);
            _context.Rooms.Add(room);
            _context.SaveChanges();
        }
        
        public IEnumerable<User> GetUsers()
        {
            return _context.Users;
        }

        public IEnumerable<User> GetUsersByRole(int role)
        {
            return _context.Users.Where(x => (int)x.Role == role);
        }

        public User GetById(int id)
        {
            return getUser(id);
        }

        public void DeleteUser(int id)
        {
            var user = getUser(id);
            _context.Users.Remove(user);
            _context.SaveChanges();
        }

        public IEnumerable<Room> GetRooms()
        {
            return _context.Rooms;
        }

        public void DeleteRoom(int id)
        {
            var room = _context.Rooms.Find(id);
            _context.Rooms.Remove(room);
            _context.SaveChanges();
        }

        public IEnumerable<Booking> GetAllBookings()
        {
            return _context.Bookings;
        }

        public Booking GetBookingById(int id)
        {
            return _context.Bookings.Find(id);
        }

        public void DeleteBooking(int id)
        {
            var booking = GetBookingById(id);
            _context.Bookings.Remove(booking);
            _context.SaveChanges();
        }

        private User getUser(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null) throw new KeyNotFoundException("User not found!");
            return user;
        }
    }
}