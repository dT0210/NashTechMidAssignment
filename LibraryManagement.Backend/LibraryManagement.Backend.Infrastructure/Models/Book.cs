using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LibraryManagement.Backend.Shared;

namespace LibraryManagement.Backend.Infrastructure.Models;

[Table("Books")]
public class Book
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [MaxLength(255)]
    public string Title { get; set; }

    [Required]
    [MaxLength(100)]
    public string Author { get; set; }

    public bool IsAvailable { get; set; } = true;

    [Required]
    public Guid CategoryId { get; set; }

    [StringLength(2000)]
    public string? Cover { get; set; }

    [Required]
    [StringLength(2000)]
    public string Description { get; set; }

    public Category Category { get; set; }
    public ICollection<BookBorrowingRequestDetails>? BorrowingRequestDetails { get; set; }
}