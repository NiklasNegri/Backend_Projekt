using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Bookings;

public class RegisterBooking
{
    [Required]
    public int CustomerId { get; set; }

    [Required]
    public string StartTime { get; set; }
    
    [Required]
    public double Duration { get; set; }
    
    [Required]
    public int RoomId { get; set; }

    [Required]
    public int WorkerId { get; set; }
}