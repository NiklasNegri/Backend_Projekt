using System.Text.Json.Nodes;
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
            _userService.RegisterUser(model);
            return Ok(new { message = "User successfully registered!" });
        }

        [HttpGet("{id}")]
        public IActionResult GetUserInfo(int id)
        {
            var user = _userService.GetById(id);
            return Ok(user);
        }

        [Authorize(Role.Admin)]
        [HttpGet("allusers")]
        public IActionResult GetUsers()
        {
            var users = _userService.GetUsers();
            return Ok(users);
        }

        [HttpPatch("update")]
        public IActionResult UpdateUser(UpdateUser model)
        {
            _userService.UpdateUser(model, GetAuthenticatedUserId());
            return Ok(new { message = "User updated!" });
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            if (GetAuthenticatedUser().Role != Role.Admin && id != GetAuthenticatedUserId())
                return BadRequest("You cannot delete another user!");

            if (id == GetAuthenticatedUserId() || GetAuthenticatedUser().Role == Role.Admin)
                _userService.DeleteUser(id);

            return Ok(new { message = "User deleted" });
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
