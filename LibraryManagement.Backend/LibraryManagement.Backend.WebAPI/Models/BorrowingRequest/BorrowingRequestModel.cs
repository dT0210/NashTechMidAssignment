using System.ComponentModel.DataAnnotations;
using LibraryManagement.Backend.Shared;

namespace LibraryManagement.Backend.WebAPI.Models;

public class BorrowingRequestModel
{
    [Required]
    public Guid RequestorId { get; set; }

    public ICollection<Guid>? Books { get; set; }
}