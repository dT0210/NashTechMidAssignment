using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using LibraryManagement.Backend.WebAPI.Models;
using LibraryManagement.Backend.WebAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace LibraryManagement.Backend.WebAPI.Controllers;

[ApiController]
public class AuthenticationController : ControllerBase {
    private readonly ILogger<AuthenticationController> _logger;
    private readonly IUserService _userService;
    public AuthenticationController(ILogger<AuthenticationController> logger, IUserService userService) {
        _logger = logger;
        _userService = userService;
    }
    [HttpPost("login")]
    public async Task<IActionResult> LoginAsync([FromBody] LoginRequestModel model)
    {
        if (!ModelState.IsValid) {
            return BadRequest(ModelState);
        }
        
        var response = await _userService.LoginAsync(model);
        if (response.Success) {
            return Ok(response);
        }
        
        return Unauthorized(response);
    }

}