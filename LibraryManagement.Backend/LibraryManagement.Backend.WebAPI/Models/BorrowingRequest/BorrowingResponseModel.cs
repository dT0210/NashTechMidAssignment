using LibraryManagement.Backend.Infrastructure.Models;
using LibraryManagement.Backend.Shared;

namespace LibraryManagement.Backend.WebAPI.Models;

public class BorrowingResponseModel
{
    public Guid Id { get; set; }
    public UserResponseModel Requestor { get; set; }
    public DateTime RequestedAt { get; set; }
    public BorrowingStatusType Status { get; set; }
    public UserResponseModel Approver { get; set; }
    public ICollection<BookResponseModel> Books { get; set; }
}