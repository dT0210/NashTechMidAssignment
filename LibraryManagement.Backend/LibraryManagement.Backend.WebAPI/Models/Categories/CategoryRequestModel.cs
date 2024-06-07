using System.ComponentModel.DataAnnotations;

namespace LibraryManagement.Backend.WebAPI.Models;

public class CategoryRequestModel {
    [Required]
    [StringLength(50)]
    public string Name {get; set;}
    
    public string Description {get; set;}
}