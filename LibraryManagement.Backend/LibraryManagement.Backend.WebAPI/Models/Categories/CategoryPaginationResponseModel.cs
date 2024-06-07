namespace LibraryManagement.Backend.WebAPI.Models;

public class CategoryPaginationResponseModel
{
    public int TotalCount { get; set; }
    public IEnumerable<CategoryResponseModel> Data { get; set; }
}