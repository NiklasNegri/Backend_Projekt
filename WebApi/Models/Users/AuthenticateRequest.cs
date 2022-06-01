namespace WebApi.Models.Users;

using System.ComponentModel.DataAnnotations;

public class AuthenticateRequest
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    
    [Required]
    [StringLength(16, ErrorMessage = "Password can be maximum 16 characters!")]
    public string Password { get; set; }
}