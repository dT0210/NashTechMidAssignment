using System.IdentityModel.Tokens.Jwt;
using AutoMapper;
using LibraryManagement.Backend.Infrastructure.Models;
using LibraryManagement.Backend.Infrastructure.Repositories;
using LibraryManagement.Backend.Shared;
using LibraryManagement.Backend.WebAPI.Models;
using Microsoft.AspNetCore.Identity;

namespace LibraryManagement.Backend.WebAPI.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly ITokenService _tokenService;
    private readonly PasswordHasher<User> _passwordHasher;
    private readonly IMapper _mapper;
    public UserService(IUserRepository userRepository, ITokenService tokenService, IMapper mapper)
    {
        _userRepository = userRepository;
        _tokenService = tokenService;
        _mapper = mapper;
        _passwordHasher = new PasswordHasher<User>();
    }

    public async Task<IEnumerable<UserResponseModel>> GetAllUsersAsync()
    {
        var users = await _userRepository.GetAllAsync();
        return users.Select(_mapper.Map<UserResponseModel>);
    }

    public async Task<UserResponseModel> GetUserByIdAsync(Guid id)
    {
        var user = await _userRepository.GetByIdAsync(id) ?? throw new KeyNotFoundException("User not found");
        return _mapper.Map<UserResponseModel>(user);
    }

    public async Task<LoginResponseModel> LoginAsync(LoginRequestModel login)
    {
        var user = await _userRepository.GetByUsernameAsync(login.Username);
        var response = new LoginResponseModel();
        if (user == null)
        {
            response.Success = false;
            response.Message = "Invalid username or password";
            return response;
        }
        var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, login.Password);
        if (result == PasswordVerificationResult.Success)
        {
            response.Success = true;
            response.Message = "Login successful";
            response.Token = _tokenService.GenerateJWT(user);
            response.User = _mapper.Map<UserResponseModel>(user);
        }
        else
        {
            response.Success = false;
            response.Message = "Invalid username or password";
        }
        return response;
    }

    public async Task<UserResponseModel> RegisterAsync(UserRequestModel user, UserRoleType role)
    {
        if (await _userRepository.GetByUsernameAsync(user.Username) != null)
        {
            throw new ArgumentException("Username already exists");
        }
        if (await _userRepository.GetByEmailAsync(user.Email) != null)
        {
            throw new ArgumentException("Email already exists");
        }
        var newUser = _mapper.Map<User>(user);
        newUser.PasswordHash = _passwordHasher.HashPassword(newUser, user.Password);
        newUser.Role = role;
        await _userRepository.InsertAsync(newUser);
        return _mapper.Map<UserResponseModel>(newUser);
    }

    public Task<UserResponseModel> UpdateUserAsync(Guid id, UserRequestModel user)
    {
        throw new NotImplementedException();
    }

    public Task DeleteUserAsync(Guid id)
    {
        throw new NotImplementedException();
    }
}