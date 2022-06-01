using AutoMapper;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Rooms;
using WebApi.Models.Users;
using WebApi.Models.Bookings;
namespace WebApi.Services
{
    public interface IBookingService
    {
        void RegisterBooking(RegisterBooking model, int authenticatedUserId);
        void RegisterRoom(RegisterRoom model);
        IEnumerable<Booking> GetAllBookings();
        IEnumerable<Booking> GetUserBookings(int authenticatedUserId);
        Booking GetBookingById(int id);
        IEnumerable<Room> GetRooms();
        IEnumerable<Room> GetAvailableRooms(string t);
        IEnumerable<User> GetAvailableWorkers(string t);
        void DeleteBooking(int id, int authenticatedUserId);
        void DeleteRoom(int id);
    }

    public class BookingService : IBookingService
    {
        private DataContext _context;
        private readonly IMapper _mapper;
        public BookingService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void RegisterBooking(RegisterBooking model, int authenticatedUserId)
        {
            var worker = _context.Users.FirstOrDefault(x => x.Id == model.WorkerId);
            if (worker == null || worker.Role != Role.Worker)
                throw new KeyNotFoundException("Cannot find a worker with this id");

            var customer = _context.Users.FirstOrDefault(x => x.Id == model.UserId);

            if (customer == null || customer.Role != Role.Customer && customer.Id != model.UserId)
                throw new KeyNotFoundException("Cannot find a customer with this id");

            var room = _context.Rooms.FirstOrDefault(x => x.Id == model.RoomId);
            if (room == null)
                throw new KeyNotFoundException("Room id does not exist!");

            var workerBooked = _context.Bookings.FirstOrDefault(x => (x.StartTime == DateTime.Parse(model.StartTime) && x.WorkerId == model.WorkerId));
            if (workerBooked != null)
                throw new AppException("Worker is already scheduled to work at that time!");

            var customerBooked = _context.Bookings.FirstOrDefault(
                x => (x.StartTime == DateTime.Parse(model.StartTime) && x.Id == model.UserId));
            if (customerBooked != null)
                throw new AppException("Customer is already booked at that time!");

            var roomedBooked = _context.Bookings.FirstOrDefault(
                x => (x.StartTime == DateTime.Parse(model.StartTime) && x.RoomId == model.RoomId));
            if (roomedBooked != null)
                throw new AppException("Room is already booked at that time!");

            var booking = _mapper.Map<Booking>(model);
            booking.RoomName = room.RoomName;
            booking.WorkerName = worker.Firstname + ' ' + worker.Lastname;
            booking.StartTime = DateTime.Parse(model.StartTime);
            booking.EndTime = DateTime.Parse(model.StartTime).AddMinutes(Convert.ToDouble(model.Duration));

            _context.Bookings.Add(booking);
            _context.SaveChanges();
        }

        public void RegisterRoom(RegisterRoom model)
        {
            var checkRoomName = _context.Rooms.Any(x => x.RoomName == model.RoomName);
            if (checkRoomName)
            {
                throw new AppException("Roomname is already in use!");
            }
            var room = _mapper.Map<Room>(model);
            _context.Rooms.Add(room);
            _context.SaveChanges();
        }

        public IEnumerable<Booking> GetAllBookings()
        {
            return _context.Bookings;
        }

        public IEnumerable<Booking> GetUserBookings(int authenticatedUserId)
        {
            var bookings = _context.Bookings.Where(x => x.UserId == authenticatedUserId);
            if (bookings == null)
                throw new KeyNotFoundException("No bookings found!");

            return bookings;
        }

        public Booking GetBookingById(int id)
        {
            var booking = _context.Bookings.Find(id);
            if (booking == null)
                throw new AppException("Booking with that id does not exist!");
            return booking;
        }

        public IEnumerable<Room> GetRooms()
        {
            return _context.Rooms;
        }
        
        public IEnumerable<Room> GetAvailableRooms(string t)
        {
            var rooms = _context.Rooms;
            var existingBookings = _context.Bookings.Where(x => x.StartTime == DateTime.Parse(t)).ToList();

            if (existingBookings.Count() == 0)
                return rooms;
            else
            {
                var availableRooms = new List<Room>();
                foreach (var booking in existingBookings)
                {
                    foreach (var room in rooms)
                    {
                        if (booking.RoomId != room.Id)
                        {
                            availableRooms.Add(room);
                        }
                    }
                }
                return availableRooms;
            }
        }

        public IEnumerable<User> GetAvailableWorkers(string t)
        {
            var workers = _context.Users.Where(x => x.Role == Role.Worker);
            var existingBookings = _context.Bookings.Where(x => x.StartTime == DateTime.Parse(t)).ToList();

            if (existingBookings.Count() == 0)
                return workers;
            else
            {
                var availableWorkers = new List<User>();
                foreach (var booking in existingBookings)
                {
                    foreach (var worker in workers)
                    {
                        if (booking.WorkerId != worker.Id)
                        {
                            availableWorkers.Add(worker);
                        }
                    }
                }
                return availableWorkers;
            }
        }

        public void DeleteBooking(int id, int authenticatedUserId)
        {
            var booking = _context.Bookings.Find(id);
            if (booking == null)
                throw new AppException("No booking with that id!");

            if (booking.UserId != authenticatedUserId && (_context.Users.Find(authenticatedUserId).Role) != Role.Admin)
                throw new AppException("Attempted to delete another users bookings!");

            _context.Bookings.Remove(booking);
            _context.SaveChanges();
        }
        
        public void DeleteRoom(int id)
        {
            var room = _context.Rooms.Find(id);
            _context.Rooms.Remove(room);
            _context.SaveChanges();
        }
    }
}
