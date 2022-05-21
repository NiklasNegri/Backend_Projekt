using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Users
{
    public class RegisterUser
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        [Phone]
        public string Phone { get; set; }
        public Role Role { get; set; }
    }
}