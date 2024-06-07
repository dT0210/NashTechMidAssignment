using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LibraryManagement.Backend.Shared;

namespace LibraryManagement.Backend.Infrastructure.Models;

[Table("Users")]
public class User {
    [Key]
    public Guid Id {get; set;} = Guid.NewGuid();

    [Required]
    [StringLength(50)]
    public string Username {get; set;}

    [StringLength(100)]
    public string FullName {get; set;}

    [Required]
    [EmailAddress]
    [StringLength(254)]
    public string Email {get; set;}

    [Required]
    public UserRoleType Role {get; set;}

    [Required]
    public string PasswordHash {get; set;}
    
    public ICollection<BookBorrowingRequest>? RequestedBooks { get; set; }
    public ICollection<BookBorrowingRequest>? ApprovedRequests { get; set; }
}