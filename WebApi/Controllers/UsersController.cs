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
        
        [Authorize(Role.Customer)]
        [HttpDelete]
        public IActionResult DeleteUser()
        {
            _userService.DeleteUser(GetAuthenticatedUser().Id);
            return Ok(new { message = "User deleted" });
        }
        
        [Authorize(Role.Customer)]
        [HttpPost("booking")]
        public IActionResult CreateBooking(RegisterBooking model)
        {
            _userService.CreateBooking(model, GetAuthenticatedUser().Id);
            return Ok(new { message = "Booking successfully registered!" });
        }

        [HttpGet("rooms")]
        public IActionResult GetRoomIds()
        {
            var roomIds = _userService.GetRoomIds();
            return Ok(roomIds);
        }

        [HttpGet("workers")]
        public IActionResult GetWorkerIds()
        {
            var workerIds = _userService.GetWorkerIds();
            return Ok(workerIds);
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
