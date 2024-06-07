using LibraryManagement.Backend.Shared;
using LibraryManagement.Backend.WebAPI.Models;
using LibraryManagement.Backend.WebAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagement.Backend.WebAPI.Controllers;

[ApiController]
[Route("books")]
public class BookController : ControllerBase
{
    private readonly ILogger<BookController> _logger;
    private readonly IBookService _bookService;

    public BookController(ILogger<BookController> logger, IBookService bookService)
    {
        _logger = logger;
        _bookService = bookService;
    }

    [HttpGet]
    public async Task<IActionResult> GetBooks(bool? isAvailable, int page = 1, int perPage = 10, string search = "")
    {
        try
        {
            var books = await _bookService.GetAllBooksAsync(isAvailable, page, perPage, search);
            return Ok(books);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting books");
            return StatusCode(500, "Error getting books");
        }
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetBookById(Guid id)
    {
        try
        {
            var book = await _bookService.GetBookByIdAsync(id);
            return Ok(book);
        }
        catch (KeyNotFoundException e)
        {
            return NotFound("Book not found");
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting book");
            return StatusCode(500, "Error getting book");
        }
    }

    [HttpPost]
    [Authorize(Roles = nameof(UserRoleType.Super))]
    public async Task<IActionResult> AddBook([FromBody] BookRequestModel book)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        try
        {
            var newBook = await _bookService.CreateBookAsync(book);
            return CreatedAtAction(nameof(GetBookById), new { id = newBook.Id }, newBook);
        }
        catch (ArgumentException)
        {
            return BadRequest("Invalid book data");
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error adding book");
            return StatusCode(500, "Error adding book");
        }
    }

    [HttpPut]
    [Route("{id}")]
    [Authorize(Roles = nameof(UserRoleType.Super))]
    public async Task<IActionResult> UpdateBook(Guid id, [FromBody] BookRequestModel book)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        try
        {
            var updatedBook = await _bookService.UpdateBookAsync(id, book);
            return Ok(updatedBook);
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(e.Message);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error updating book");
            return StatusCode(500, "Error updating book");
        }
    }

    [HttpDelete]
    [Route("{id}")]
    [Authorize(Roles = nameof(UserRoleType.Super))]
    public async Task<IActionResult> DeleteBook(Guid id)
    {
        try
        {
            await _bookService.DeleteBookAsync(id);
            return Ok("Book deleted.");
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(e.Message);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error deleting book");
            return StatusCode(500, "Error deleting book");
        }
    }
}