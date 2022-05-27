using Microsoft.AspNetCore.Mvc;
using WebApi.Authorization;
using WebApi.Entities;
using WebApi.Models.Bookings;
using WebApi.Models.Users;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        
        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _userService.Authenticate(model);
            return Ok(response);
        }
        
        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register(RegisterUser model)
        {
            _userService.RegisterCustomer(model);
            return Ok(new { message = "User successfully registered!" });
        }

        [HttpPatch("update")]
        public IActionResult UpdateUser(UpdateUser model)
        {
            _userService.UpdateUser(model);
            return Ok(new { message = "User updated!"});
        }
        
        [Authorize(Role.Customer)]
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            _userService.DeleteUser(id, GetAuthenticatedUser().Id);
            return Ok(new { message = "User deleted" });
        }
        
        [Authorize(Role.Customer)]
        [HttpPost("booking")]
        public IActionResult CreateBooking(RegisterBooking model)
        {
            _userService.CreateBooking(model);
            return Ok(new { message = "Booking successfully registered!" });
        }

        [HttpGet("rooms")]
        public IActionResult GetRooms()
        {
            var rooms = _userService.GetRooms();
            return Ok(rooms);
        }

        [HttpGet("workers")]
        public IActionResult GetWorkers()
        {
            var workers = _userService.GetWorkers();
            return Ok(workers);
        }

        [HttpGet("booking")]
        public IActionResult GetUserBookings()
        {
            var bookings = _userService.GetUserBookings(GetAuthenticatedUser().Id);
            return Ok(bookings);
        }

        [HttpDelete("booking/{id}")]
        public IActionResult DeleteBooking(int id)
        {
            var booking = _userService.GetBookingById(id);
            _userService.DeleteBooking(booking, GetAuthenticatedUser().Id);
            return Ok(new { message = "Booking deleted!" });
        }

        [HttpGet]
        public IActionResult GetUserInfo()
        {
            var user = _userService.GetById(GetAuthenticatedUser().Id);
            return Ok(user);
        }

        private User GetAuthenticatedUser()
        {
            return (User)HttpContext.Items["User"];
        }
    }
}
