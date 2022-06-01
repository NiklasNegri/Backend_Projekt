using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebApi.Authorization;
using WebApi.Entities;
using WebApi.Models.Rooms;
using WebApi.Models.Bookings;
using WebApi.Models.Users;
using WebApi.Services;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class BookingsController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingsController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [Authorize(Role.Customer)]
        [HttpPost("booking")]
        public IActionResult RegisterBooking(RegisterBooking model)
        {
            _bookingService.RegisterBooking(model, GetAuthenticatedUserId());
            return Ok(new { message = "Booking successfully registered!" });
        }

        [Authorize(Role.Admin)]
        [HttpPost("room")]
        public IActionResult RegisterRoom(RegisterRoom model)
        {
            _bookingService.RegisterRoom(model);
            return Ok(new { message = "User successfully registered!" });
        }


        [Authorize(Role.Admin)]
        [HttpGet("allbookings")]
        public IActionResult GetAllBookings()
        {
            var bookings = _bookingService.GetAllBookings();
            return Ok(bookings);
        }

        [HttpGet("userbookings")]
        public IActionResult GetUserBookings()
        {
            var bookings = _bookingService.GetUserBookings(GetAuthenticatedUserId());
            return Ok(bookings);
        }

        [HttpGet("rooms")]
        public IActionResult GetRooms()
        {
            var rooms = _bookingService.GetRooms();
            return Ok(rooms);
        }

        [HttpGet("availablerooms/{time}")]
        public IActionResult GetAvailableRooms(string time)
        {
            var rooms = _bookingService.GetAvailableRooms(time);
            return Ok(rooms);
        }

        [HttpGet("availableworkers/{time}")]
        public IActionResult GetAvailableWorkers(string time)
        {
            var workers = _bookingService.GetAvailableWorkers(time);
            return Ok(workers);
        }

        [Authorize(Role.Admin)]
        [HttpDelete("room/{id}")]
        public IActionResult DeleteRoom(int id)
        {
            _bookingService.DeleteRoom(id);
            return Ok(new { message = "Room deleted" });
        }

        [HttpDelete("booking/{id}")]
        public IActionResult DeleteBooking(int id)
        {
            _bookingService.DeleteBooking(id, GetAuthenticatedUserId());
            return Ok(new { message = "Booking deleted!" });
        }

        private User GetAuthenticatedUser()
        {
            return (User)HttpContext.Items["User"];
        }

        private int GetAuthenticatedUserId()
        {
            return GetAuthenticatedUser().Id;
        }
    }
}