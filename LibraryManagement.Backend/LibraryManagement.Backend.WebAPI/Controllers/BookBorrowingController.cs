using System.Security.Claims;
using LibraryManagement.Backend.Shared;
using LibraryManagement.Backend.WebAPI.Models;
using LibraryManagement.Backend.WebAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagement.Backend.WebAPI.Controllers;

[ApiController]
[Route("/books-borrowing")]
[Authorize]
public class BookBorrowingController : ControllerBase
{
    private readonly IBorrowingRequestService _borrowingRequestService;
    private readonly ILogger _logger;
    private Guid UserId => Guid.Parse(User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value);
    public BookBorrowingController(IBorrowingRequestService borrowingRequestService, ILogger<BookBorrowingController> logger)
    {
        _borrowingRequestService = borrowingRequestService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetBorrowingRequests(BorrowingStatusType? status, int page = 1, int perPage = 10, string search = "")
    {
        try
        {
            var requests = await _borrowingRequestService.GetAllRequestsAsync(null, null, status, page, perPage, search);
            return Ok(requests);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error while getting borrowing requests");
            return StatusCode(500, "Error getting borrowing requests");
        }
    }

    [HttpGet]
    [Route("users/{id}")]
    public async Task<IActionResult> GetBorrowingRequestsByRequestorId(Guid id, BorrowingStatusType? status, int page = 1, int perPage = 10, string search = "")
    {
        try
        {
            var requests = await _borrowingRequestService.GetAllRequestsAsync(id, null, status, page, perPage, search);
            return Ok(requests);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error while getting borrowing requests");
            return StatusCode(500, "Error getting borrowing requests");
        }
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetBorrowingRequestById(Guid id)
    {
        try
        {
            var request = await _borrowingRequestService.GetRequestByIdAsync(id);
            return Ok(request);
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(e.Message);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error while getting borrowing request by id");
            return StatusCode(500, "Error getting borrowing request by id");
        }
    }

    [HttpPost]
    public async Task<IActionResult> BorrowBook([FromBody] BorrowingRequestModel request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        try
        {
            var newRequest = await _borrowingRequestService.CreateRequestAsync(request);
            return Ok(newRequest);
        }
        catch (InvalidOperationException e)
        {
            return BadRequest(e.Message);
        }
        catch (ArgumentException e)
        {
            return BadRequest(e.Message);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error while creating borrowing request");
            return StatusCode(500, "Error creating borrowing request");
        }
    }

    [HttpPut]
    [Route("{id}")]
    [Authorize(Roles = nameof(UserRoleType.Super))]
    public async Task<IActionResult> UpdateBorrowingRequest(Guid id, BorrowingStatusType status)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        try
        {
            await _borrowingRequestService.UpdateRequestAsync(id, UserId, status);
            return Ok();
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(e.Message);
        }
        catch (ArgumentException e)
        {
            return BadRequest(e.Message);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error while updating borrowing request");
            return StatusCode(500, "Error updating borrowing request");
        }
    }
}