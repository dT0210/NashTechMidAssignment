using LibraryManagement.Backend.WebAPI.Models;

namespace LibraryManagement.Backend.WebAPI.Services;

public interface ICategoryService
{
    Task<CategoryPaginationResponseModel> GetAllCategoriesAsync(int page, int perPage, string search);
    Task<CategoryResponseModel> GetCategoryByIdAsync(Guid id);
    Task<CategoryResponseModel> CreateCategoryAsync(CategoryRequestModel category);
    Task<CategoryResponseModel> UpdateCategoryAsync(Guid id, CategoryRequestModel category);
    Task DeleteCategoryAsync(Guid id);
}