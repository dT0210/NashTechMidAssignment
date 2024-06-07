using AutoMapper;
using LibraryManagement.Backend.Infrastructure.Models;
using LibraryManagement.Backend.Infrastructure.Repositories;
using LibraryManagement.Backend.WebAPI.Models;

namespace LibraryManagement.Backend.WebAPI.Services;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;
    private readonly IMapper _mapper;

    public CategoryService(ICategoryRepository categoryRepository, IMapper mapper)
    {
        _categoryRepository = categoryRepository;
        _mapper = mapper;
    }

    public async Task<CategoryResponseModel> CreateCategoryAsync(CategoryRequestModel category)
    {
        var newCategory = _mapper.Map<Category>(category);
        await _categoryRepository.InsertAsync(newCategory);
        return _mapper.Map<CategoryResponseModel>(newCategory);
    }

    public async Task<CategoryPaginationResponseModel> GetAllCategoriesAsync(int page, int perPage, string search)
    {
        var categoriesQuery = _categoryRepository.GetAllQueryable();

        if (!string.IsNullOrEmpty(search))
        {
            categoriesQuery = categoriesQuery.Where(c => c.Name.Contains(search) || c.Description.Contains(search));
        }
        var pagedCategories = categoriesQuery.Skip((page - 1) * perPage).Take(perPage);
        var response = new CategoryPaginationResponseModel
        {
            TotalCount = categoriesQuery.Count(),
            Data = pagedCategories.Select(_mapper.Map<CategoryResponseModel>)
        };
        return response;
    }

    public async Task<CategoryResponseModel> GetCategoryByIdAsync(Guid id)
    {
        var category = await _categoryRepository.GetByIdAsync(id) ?? throw new KeyNotFoundException("Category not found");
        return _mapper.Map<CategoryResponseModel>(category);
    }

    public async Task<CategoryResponseModel> UpdateCategoryAsync(Guid id, CategoryRequestModel category)
    {
        var existingCategory = await _categoryRepository.GetByIdAsync(id) ?? throw new KeyNotFoundException("Category not found");
        _mapper.Map(category, existingCategory);
        existingCategory.Id = id;
        _categoryRepository.Update(existingCategory);
        return _mapper.Map<CategoryResponseModel>(existingCategory);
    }

    public async Task DeleteCategoryAsync(Guid id)
    {
        var existingCategory = await _categoryRepository.GetByIdAsync(id) ?? throw new KeyNotFoundException("Category not found");
        await _categoryRepository.DeleteAsync(id);
    }
}