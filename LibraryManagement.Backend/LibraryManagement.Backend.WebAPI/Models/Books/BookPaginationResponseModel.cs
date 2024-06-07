namespace LibraryManagement.Backend.WebAPI.Models;

public class BookPaginationResponseModel {
    public int TotalCount { get; set; }
    public IEnumerable<BookResponseModel> Data { get; set; }
}