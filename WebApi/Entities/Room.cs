namespace WebApi.Entities;

public class Room
{
    public int Id { get; set; }
    public string RoomName { get; set; }
    public RoomType RoomType { get; set; }
}

public enum RoomType
{
    Spa,
    MassageRoom,
    HairSalon
}