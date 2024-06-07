using LibraryManagement.Backend.Infrastructure.Models;

namespace LibraryManagement.Backend.Infrastructure.Repositories;

public interface IGenericRepository<T> where T : class
{
    IQueryable<T> GetAllQueryable();
    Task<IEnumerable<T>> GetAllAsync();
    Task<T>? GetByIdAsync(Guid id);
    Task InsertAsync(T obj);
    void Update(T obj);
    Task DeleteAsync(Guid id);
}