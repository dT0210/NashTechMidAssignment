using LibraryManagement.Backend.WebAPI.Models;

namespace LibraryManagement.Backend.WebAPI.Services;

public interface IBookService
{
    Task<BookPaginationResponseModel> GetAllBooksAsync(bool? isAvailable, int page, int perPage, string search);
    Task<BookResponseModel> GetBookByIdAsync(Guid id);
    Task<BookResponseModel> CreateBookAsync(BookRequestModel book);
    Task<BookResponseModel> UpdateBookAsync(Guid id, BookRequestModel book);
    Task DeleteBookAsync(Guid id);
}