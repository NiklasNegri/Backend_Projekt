using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Rooms;

public class RegisterRoom
{
    [Required]
    public string RoomName { get; set; }
    
    [Required]
    public RoomType RoomType { get; set; }    
}