using System.ComponentModel.DataAnnotations;

namespace LibraryManagement.Backend.Infrastructure.Models;

public class BookBorrowingRequestDetails
{
    [Required]
    public Guid BookBorrowingRequestId { get; set; }
    [Required]
    public Guid BookId { get; set; }

    public BookBorrowingRequest BookBorrowingRequest { get; set; }
    public Book Book { get; set; }
}