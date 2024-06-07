using LibraryManagement.Backend.Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagement.Backend.Infrastructure.Repositories;

public class BorrowingRequestRepository : GenericRepository<BookBorrowingRequest>, IBorrowingRequestRepository
{
    public BorrowingRequestRepository(LibraryManagementContext dbContext) : base(dbContext)
    {
    }
    public override async Task<IEnumerable<BookBorrowingRequest>> GetAllAsync()
    {
        return await _dbContext.Set<BookBorrowingRequest>()
                .Include(r => r.Requestor)
                .Include(r => r.Approver)
                .Include(r => r.Details)
                .ToListAsync();
    }

    public override async Task<BookBorrowingRequest> GetByIdAsync(Guid id)
    {
        return await _dbContext.Set<BookBorrowingRequest>()
                .Include(r => r.Requestor)
                .Include(r => r.Approver)
                .Include(r => r.Details)
                .FirstOrDefaultAsync(r => r.Id == id);
    }

    public override IQueryable<BookBorrowingRequest> GetAllQueryable()
    {
        return _dbContext.Set<BookBorrowingRequest>()
                .Include(r => r.Requestor)
                .Include(r => r.Approver)
                .Include(r => r.Details);
    }
}