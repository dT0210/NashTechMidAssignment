using AutoMapper;
using LibraryManagement.Backend.Infrastructure.Models;
using LibraryManagement.Backend.WebAPI.Models;

namespace LibraryManagement.Backend.WebAPI.Common;

public class MapperProfile : Profile {
    public MapperProfile() {
        CreateMap<Book, BookResponseModel>();

        CreateMap<BookRequestModel, Book>();

        CreateMap<Category, CategoryResponseModel>();

        CreateMap<CategoryRequestModel, Category>();
        
        CreateMap<User, UserResponseModel>();

        CreateMap<UserRequestModel, User>();
        
        CreateMap<BorrowingRequestModel, BookBorrowingRequest>();

        CreateMap<BookBorrowingRequest, BorrowingResponseModel>();
    }
}