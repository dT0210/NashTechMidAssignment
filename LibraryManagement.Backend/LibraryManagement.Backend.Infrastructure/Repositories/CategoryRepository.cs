using LibraryManagement.Backend.Infrastructure.Models;

namespace LibraryManagement.Backend.Infrastructure.Repositories;

public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
{
    public CategoryRepository(LibraryManagementContext context) : base(context)
    {
    }
}