using LibraryManagement.Backend.Shared;

namespace LibraryManagement.Backend.WebAPI.Models;

public class UserResponseModel {
    public Guid Id {get; set;}
    public string Username {get; set;}
    public string FullName {get; set;}
    public string Email {get; set;}
    public UserRoleType Role {get; set;}
}