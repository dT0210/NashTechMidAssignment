using LibraryManagement.Backend.Shared;

namespace LibraryManagement.Backend.WebAPI.Models;

public class UpdateRequestModel
{
    public BorrowingStatusType Status { get; set; }
}