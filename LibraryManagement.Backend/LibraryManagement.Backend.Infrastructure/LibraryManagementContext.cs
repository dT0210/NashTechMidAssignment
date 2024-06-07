using LibraryManagement.Backend.Infrastructure.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace LibraryManagement.Backend.Infrastructure;

public class LibraryManagementContext : DbContext
{
    public DbSet<Book> Books { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<BookBorrowingRequest> BookBorrowingRequests { get; set; }
    public DbSet<BookBorrowingRequestDetails> BookBorrowingRequestDetails { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {

    }
    public LibraryManagementContext(DbContextOptions<LibraryManagementContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>()
            .HasIndex(u => u.Username)
            .IsUnique();

        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<Category>()
            .HasIndex(c => c.Name)
            .IsUnique();

        modelBuilder.Entity<BookBorrowingRequest>()
            .HasOne(b => b.Requestor)
            .WithMany(u => u.RequestedBooks)
            .HasForeignKey(b => b.RequestorId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<BookBorrowingRequest>()
            .HasOne(b => b.Approver)
            .WithMany(u => u.ApprovedRequests)
            .HasForeignKey(b => b.ApproverId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<BookBorrowingRequestDetails>()
            .HasOne(bd => bd.BookBorrowingRequest)
            .WithMany(b => b.Details)
            .HasForeignKey(bd => bd.BookBorrowingRequestId);

        modelBuilder.Entity<BookBorrowingRequestDetails>()
            .HasOne(bd => bd.Book)
            .WithMany(b => b.BorrowingRequestDetails)
            .HasForeignKey(bd => bd.BookId);

        modelBuilder.Entity<Book>()
            .HasOne(b => b.Category)
            .WithMany(c => c.Books)
            .HasForeignKey(b => b.CategoryId);

        modelBuilder.Entity<Book>()
            .HasMany(b => b.BorrowingRequestDetails)
            .WithOne(bd => bd.Book)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Category>()
            .HasMany(c => c.Books)
            .WithOne(b => b.Category)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<BookBorrowingRequestDetails>()
            .HasKey(br => new { br.BookBorrowingRequestId, br.BookId });
    }


}