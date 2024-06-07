using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryManagement.Backend.Infrastructure.Models;

[Table("Categories")]
public class Category {
    [Key]
    public Guid Id {get; set;} = Guid.NewGuid();

    [Required]
    [StringLength(50)]
    public string Name {get; set;}
    public string Description {get; set;}
    
    public ICollection<Book>? Books {get; set;}
}