using AutoMapper;
using LibraryManagement.Backend.Infrastructure.Models;
using LibraryManagement.Backend.Infrastructure.Repositories;
using LibraryManagement.Backend.WebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagement.Backend.WebAPI.Services;

public class BookService : IBookService
{
    private readonly IBookRepository _bookRepository;
    private readonly ICategoryRepository _categoryRepository;
    private readonly IMapper _mapper;

    public BookService(IBookRepository bookRepository, ICategoryRepository categoryRepository, IMapper mapper)
    {
        _bookRepository = bookRepository;
        _categoryRepository = categoryRepository;
        _mapper = mapper;
    }

    public async Task<BookResponseModel> CreateBookAsync(BookRequestModel book)
    {
        var category = await _categoryRepository.GetByIdAsync(book.CategoryId) ?? throw new ArgumentException("Category was not found");
        var newBook = _mapper.Map<Book>(book);
        await _bookRepository.InsertAsync(newBook);

        var response = _mapper.Map<BookResponseModel>(newBook);
        response.Category = _mapper.Map<CategoryResponseModel>(category);
        return response;
    }

    public async Task<BookPaginationResponseModel> GetAllBooksAsync(bool? isAvailable, int page, int perPage, string search)
    {
        var booksQuery = _bookRepository.GetAllQueryable();
        if (isAvailable.HasValue)
        {
            booksQuery = booksQuery.Where(b => b.IsAvailable == isAvailable);
        }


        if (!string.IsNullOrEmpty(search))
        {
            booksQuery = booksQuery.Where(b => b.Title.Contains(search) || b.Author.Contains(search) || b.Category.Name.Contains(search));
        }

        var pagedBooks = await booksQuery.Skip((page - 1) * perPage).Take(perPage).ToListAsync();
        var response = new BookPaginationResponseModel
        {
            TotalCount = await booksQuery.CountAsync(),
            Data = pagedBooks.Select(_mapper.Map<BookResponseModel>)
        };
        return response;
    }

    public async Task<BookResponseModel> GetBookByIdAsync(Guid id)
    {
        var book = await _bookRepository.GetByIdAsync(id) ?? throw new KeyNotFoundException("Book not found");
        return _mapper.Map<BookResponseModel>(book);
    }

    public async Task<BookResponseModel> UpdateBookAsync(Guid id, BookRequestModel book)
    {
        var existingBook = await _bookRepository.GetByIdAsync(id) ?? throw new KeyNotFoundException("Book not found");
        var category = await _categoryRepository.GetByIdAsync(book.CategoryId) ?? throw new ArgumentException("Category not found");

        _mapper.Map(book, existingBook);
        existingBook.Id = id;

        _bookRepository.Update(existingBook);

        var response = _mapper.Map<BookResponseModel>(existingBook);
        response.Category = _mapper.Map<CategoryResponseModel>(category);

        return response;
    }

    public async Task DeleteBookAsync(Guid id)
    {
        var existingBook = await _bookRepository.GetByIdAsync(id) ?? throw new KeyNotFoundException("Book not found");
        await _bookRepository.DeleteAsync(id);
    }
}