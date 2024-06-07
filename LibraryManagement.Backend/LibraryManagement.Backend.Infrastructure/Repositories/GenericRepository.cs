using LibraryManagement.Backend.Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagement.Backend.Infrastructure.Repositories;

public class GenericRepository<T> : IGenericRepository<T> where T : class
{
    protected readonly LibraryManagementContext _dbContext;
    public GenericRepository(LibraryManagementContext dbContext)
    {
        _dbContext = dbContext;
    }

    public IEnumerable<T> GetAll()
    {
        return _dbContext.Set<T>().ToList();
    }

    public virtual async Task<IEnumerable<T>> GetAllAsync()
    {
        return await _dbContext.Set<T>().ToListAsync();
    }

    public virtual async Task<T?> GetByIdAsync(Guid id)
    {
        return await _dbContext.Set<T>().FindAsync(id);
    }

    public virtual async Task InsertAsync(T obj)
    {
        using (var transaction = await _dbContext.Database.BeginTransactionAsync())
        {
            try
            {
                await _dbContext.Set<T>().AddAsync(obj);
                await _dbContext.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
    }

    public virtual void Update(T obj)
    {
        using (var transaction = _dbContext.Database.BeginTransaction())
        {
            try
            {
                _dbContext.Set<T>().Update(obj);
                _dbContext.SaveChanges();
                transaction.Commit();
            }
            catch (Exception)
            {
                transaction.Rollback();
                throw;
            }
        }
    }

    public async Task DeleteAsync(Guid id)
    {
        using (var transaction = await _dbContext.Database.BeginTransactionAsync())
        {
            try
            {
                var obj = await _dbContext.Set<T>().FindAsync(id);
                if (obj != null)
                {
                    _dbContext.Set<T>().Remove(obj);
                }
                await _dbContext.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
    }

    public virtual IQueryable<T> GetAllQueryable()
    {
        return _dbContext.Set<T>();
    }
}