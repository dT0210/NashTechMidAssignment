namespace LibraryManagement.Backend.WebAPI.Models;

public class LoginResponseModel {
    public bool Success { get; set; }
    public string Message { get; set; }
    public string Token { get; set; }
    public UserResponseModel? User { get; set; }
}