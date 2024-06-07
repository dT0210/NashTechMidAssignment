using LibraryManagement.Backend.Infrastructure.Models;

namespace LibraryManagement.Backend.Infrastructure.Repositories;

public interface IUserRepository : IGenericRepository<User> {
    Task<User>? GetByUsernameAsync(string username);
    Task<User>? GetByEmailAsync(string email);
}