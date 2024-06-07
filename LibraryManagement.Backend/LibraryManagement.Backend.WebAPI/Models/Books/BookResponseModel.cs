using System.ComponentModel.DataAnnotations;

namespace LibraryManagement.Backend.WebAPI.Models;

public class BookResponseModel
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public bool IsAvailable { get; set; }
    public CategoryResponseModel Category { get; set; }
    public string Cover { get; set; }
    public string Description { get; set; }
}