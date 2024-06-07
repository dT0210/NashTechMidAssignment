using LibraryManagement.Backend.Shared;
using LibraryManagement.Backend.WebAPI.Models;
using LibraryManagement.Backend.WebAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagement.Backend.WebAPI.Controllers;

[ApiController]
[Route("/users")]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly IUserService _userService;

    public UserController(ILogger<UserController> logger, IUserService userService)
    {
        _logger = logger;
        _userService = userService;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        try
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }
        catch (Exception error)
        {
            _logger.LogError(error, "Error getting users");
            return StatusCode(500, "Error getting book");
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(Guid id)
    {
        try
        {
            var user = await _userService.GetUserByIdAsync(id);
            return Ok(user);
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(e.Message);
        }
        catch (Exception error)
        {
            _logger.LogError(error, "Error getting user");
            return StatusCode(500, "Error getting user");
        }
    }

    [HttpPost]
    public async Task<IActionResult> Register(UserRequestModel user)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        try
        {
            var newUser = await _userService.RegisterAsync(user);
            return CreatedAtAction(nameof(GetUserById), new { id = newUser.Id }, newUser);
        }
        catch (ArgumentException error)
        {
            return BadRequest(error.Message);
        }
        catch (Exception error)
        {
            _logger.LogError(error, "Error creating user");
            return StatusCode(500, "Error creating user");
        }
    }

    [HttpPost]
    [Route("admin")]
    [Authorize(Roles = nameof(UserRoleType.Super))]
    public async Task<IActionResult> RegisterAdmin(UserRequestModel user)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        try
        {
            var newUser = await _userService.RegisterAsync(user, UserRoleType.Super);
            return CreatedAtAction(nameof(GetUserById), new { id = newUser.Id }, newUser);
        }
        catch (ArgumentException error)
        {
            return BadRequest(error.Message);
        }
        catch (Exception error)
        {
            _logger.LogError(error, "Error creating user");
            return StatusCode(500, "Error creating user");
        }
    }
}