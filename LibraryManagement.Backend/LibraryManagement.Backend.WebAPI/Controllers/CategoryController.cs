using LibraryManagement.Backend.Shared;
using LibraryManagement.Backend.WebAPI.Models;
using LibraryManagement.Backend.WebAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagement.Backend.WebAPI.Controllers;

[ApiController]
[Route("categories")]
public class CategoryController : ControllerBase
{
    private readonly ILogger<CategoryController> _logger;
    private readonly ICategoryService _categoryService;
    public CategoryController(ILogger<CategoryController> logger, ICategoryService categoryService)
    {
        _logger = logger;
        _categoryService = categoryService;
    }

    [HttpGet]
    public async Task<IActionResult> GetCategories(int page = 1, int perPage = 10, string search = "")
    {
        try
        {
            var categories = await _categoryService.GetAllCategoriesAsync(page, perPage, search);
            return Ok(categories);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting categories");
            return StatusCode(500, "Error getting categories");
        }
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetCategoryById(Guid id)
    {
        try
        {
            var category = await _categoryService.GetCategoryByIdAsync(id);
            return Ok(category);
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(e.Message);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting category");
            return StatusCode(500, "Error getting category");
        }
    }

    [HttpPost]
    [Authorize(Roles = nameof(UserRoleType.Super))]
    public async Task<IActionResult> AddCategory([FromBody] CategoryRequestModel category)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        try
        {
            var newCategory = await _categoryService.CreateCategoryAsync(category);
            return CreatedAtAction(nameof(GetCategoryById), new { id = newCategory.Id }, newCategory);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error adding category");
            return StatusCode(500, "Error adding category");
        }
    }

    [HttpPut]
    [Route("{id}")]
    [Authorize(Roles = nameof(UserRoleType.Super))]
    public async Task<IActionResult> UpdateCategory(Guid id, [FromBody] CategoryRequestModel category)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        try
        {
            var updatedCategory = await _categoryService.UpdateCategoryAsync(id, category);
            return Ok(updatedCategory);
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(e.Message);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error updating category");
            return StatusCode(500, "Error updating category");
        }
    }

    [HttpDelete]
    [Route("{id}")]
    [Authorize(Roles = nameof(UserRoleType.Super))]
    public async Task<IActionResult> DeleteCategory(Guid id)
    {
        try
        {
            await _categoryService.DeleteCategoryAsync(id);
            return Ok("Delete successful");
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(e.Message);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error deleting category");
            return StatusCode(500, "Error deleting category");
        }
    }
}