using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebApi.Authorization;
using WebApi.Entities;
using WebApi.Models.Rooms;
using WebApi.Models.Users;
using WebApi.Services;

namespace WebApi.Controllers
{
    [Authorize(Role.Admin)]
    [ApiController]
    [Route("[controller]")]
    public class AdminsController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminsController(IAdminService adminService)
        {
            _adminService = adminService;
        }
        
        [HttpPost("register")]
        public IActionResult RegisterAdminUser(RegisterUser model)
        {
            _adminService.RegisterAdminUser(model);
            return Ok(new { message = model.Role + " successfully registered!" });
        }

        [HttpGet("get/all")]
        public IActionResult GetUsers()
        {
            var users = _adminService.GetUsers();
            return Ok(users);
        }

        [HttpGet("get/role/{role}")]
        public IActionResult GetUsersByRole(int role)
        {
            var users = _adminService.GetUsersByRole(role);
            return Ok(users);
        }

        [HttpGet("get/id/{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _adminService.GetById(id);
            return Ok(user);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteUser(int id)
        {
            _adminService.DeleteUser(id);
            return Ok(new { message = "User deleted" });
        }

        [HttpPost("rooms/register")]
        public IActionResult RegisterRoom(RegisterRoom model)
        {
            _adminService.RegisterRoom(model);
            return Ok(new { message = "User successfully registered!" });
        }
        
        [HttpGet("rooms/get")]
        public IActionResult GetRooms()
        {
            return Ok(_adminService.GetRooms());
        }

        [HttpDelete("rooms/delete")]
        public IActionResult DeleteRoom(int id)
        {
            _adminService.DeleteRoom(id);
            return Ok(new { message = "Room deleted" });
        }
    }
}