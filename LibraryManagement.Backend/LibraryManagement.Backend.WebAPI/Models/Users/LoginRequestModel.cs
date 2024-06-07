using System.ComponentModel.DataAnnotations;

namespace LibraryManagement.Backend.WebAPI.Models;

public class LoginRequestModel {
    [Required]
    [StringLength(50)]
    public string Username { get; set; }

    [Required]
    [StringLength(64, MinimumLength = 8)]
    [DataType(DataType.Password)]
    public string Password { get; set; }
}