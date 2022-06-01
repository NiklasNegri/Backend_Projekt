using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Users
{
    public class UpdateUser
    {
        public int Id { get; set; }
        [EmailAddress]
        public string? Email { get; set; }
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }
        [StringLength(16, ErrorMessage = "Password can be maximum 16 characters!")]
        public string? Password { get; set; }
        [Phone]
        public string? Phone { get; set; }
        public Role Role { get; set; }
        public string? WorkExperience { get; set; }
    }
}