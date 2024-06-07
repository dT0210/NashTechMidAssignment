using LibraryManagement.Backend.Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagement.Backend.Infrastructure.Repositories;

public class BookRepository : GenericRepository<Book>, IBookRepository
{
    public BookRepository(LibraryManagementContext dbContext) : base(dbContext)
    {
    }

    public override async Task<IEnumerable<Book>> GetAllAsync() {
        return await _dbContext.Set<Book>().Include(b => b.Category).ToListAsync();
    }

    public override async Task<Book> GetByIdAsync(Guid id) {
        return await _dbContext.Set<Book>().Include(b => b.Category)
                                .FirstOrDefaultAsync(b => b.Id == id);
    }

    public override IQueryable<Book> GetAllQueryable() {
        return _dbContext.Set<Book>().Include(b => b.Category);
    }
}