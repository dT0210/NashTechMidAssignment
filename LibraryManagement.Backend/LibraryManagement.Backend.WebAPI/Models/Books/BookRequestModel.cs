using System.ComponentModel.DataAnnotations;

namespace LibraryManagement.Backend.WebAPI.Models;

public class BookRequestModel
{
    [Required]
    [StringLength(255)]
    public string Title { get; set; }

    [Required]
    [StringLength(100)]
    public string Author { get; set; }

    public bool IsAvailable { get; set; }

    [Required]
    public Guid CategoryId { get; set; }

    [StringLength(2000)]
    public string Cover { get; set; }

    [StringLength(2000)]
    public string Description { get; set; }
}