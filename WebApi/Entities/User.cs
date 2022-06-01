using System.Text.Json.Serialization;

namespace WebApi.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        [JsonIgnore]
        public string PasswordHash { get; set; }
        public string Phone { get; set; }
        public Role Role { get; set; }
        public string? WorkExperience { get; set; }
        public List<Booking> Bookings { get; set; }
    }

    public enum Role
    {
        Admin,
        Customer,
        Worker
    }
}
