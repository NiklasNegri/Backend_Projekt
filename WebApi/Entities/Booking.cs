namespace WebApi.Entities;

public class Booking
{
    public int Id { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public double BookingDuration { get; set; }
    public int CustomerId { get; set; }
    public int RoomId { get; set; }
    public int WorkerId { get; set; }
}