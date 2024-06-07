using System.ComponentModel.DataAnnotations;

namespace LibraryManagement.Backend.WebAPI.Models;

public class UserRequestModel {
    [Required]
    public string Username { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    public string FullName { get; set; }

    [Required]
    [DataType(DataType.Password)]
    [StringLength(64, MinimumLength = 8)]
    public string Password { get; set; }
    
    [Required]
    [DataType(DataType.Password)]
    [Compare("Password", ErrorMessage = "Paswords don't match")]
    public string ConfirmPassword { get; set; }
}