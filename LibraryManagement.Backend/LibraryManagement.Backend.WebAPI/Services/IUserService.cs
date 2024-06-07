using LibraryManagement.Backend.Shared;
using LibraryManagement.Backend.WebAPI.Models;

namespace LibraryManagement.Backend.WebAPI.Services;

public interface IUserService {
    Task<IEnumerable<UserResponseModel>> GetAllUsersAsync();
    Task<UserResponseModel> GetUserByIdAsync(Guid id);
    Task<UserResponseModel> RegisterAsync(UserRequestModel user, UserRoleType role = UserRoleType.Normal);
    Task<LoginResponseModel> LoginAsync(LoginRequestModel login);
    Task<UserResponseModel> UpdateUserAsync(Guid id, UserRequestModel user);
    Task DeleteUserAsync(Guid id);
}