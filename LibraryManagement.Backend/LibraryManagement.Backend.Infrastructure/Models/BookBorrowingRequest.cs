using System.ComponentModel.DataAnnotations;
using LibraryManagement.Backend.Shared;

namespace LibraryManagement.Backend.Infrastructure.Models;

public class BookBorrowingRequest
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid RequestorId { get; set; }

    [Required]
    public DateTime RequestedAt { get; set; } = DateTime.Now;

    public Guid? ApproverId { get; set; }

    [Required]
    public BorrowingStatusType Status { get; set; } = BorrowingStatusType.Waiting;

    public User Requestor { get; set; }
    public User Approver { get; set; }

    public ICollection<BookBorrowingRequestDetails> Details { get; set; }
}