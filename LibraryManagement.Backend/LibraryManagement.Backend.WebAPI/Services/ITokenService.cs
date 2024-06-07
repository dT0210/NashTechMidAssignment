using System.IdentityModel.Tokens.Jwt;
using LibraryManagement.Backend.Infrastructure.Models;

namespace LibraryManagement.Backend.WebAPI.Services;

public interface ITokenService
{
    string GenerateJWT(User user);
}