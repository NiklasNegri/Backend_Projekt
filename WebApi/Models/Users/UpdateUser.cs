using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Users
{
    public class UpdateUser
    {
        public int Id { get; set; }
    
        public string? Email { get; set; }
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }

        public string? Password { get; set; }

        public string? Phone { get; set; }

        public Role Role { get; set; }
    }
}