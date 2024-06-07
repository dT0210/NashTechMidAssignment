namespace LibraryManagement.Backend.WebAPI.Models;

public class BorrowingPaginationResponseModel
{
    public int TotalCount { get; set; }
    public IEnumerable<BorrowingResponseModel> Data { get; set; }
}