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
        public string Firstname { get; set; }

        [Required]
        public string Lastname { get; set; }

        [Required]
        [StringLength(16, ErrorMessage = "Password can be maximum 16 characters!")]
        public string Password { get; set; }

        [Required]
        [Phone]
        public string Phone { get; set; }

        public Role? Role { get; set; }

        public string? WorkExperience { get; set; }
    }
}