using System.Text;
using LibraryManagement.Backend.Infrastructure;
using LibraryManagement.Backend.Infrastructure.Repositories;
using LibraryManagement.Backend.WebAPI.Common;
using LibraryManagement.Backend.WebAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace LibraryManagement.Backend.WebAPI.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
    {
        //repositories
        services.AddScoped<IBookRepository, BookRepository>();
        services.AddScoped<ICategoryRepository, CategoryRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IBorrowingRequestRepository, BorrowingRequestRepository>();

        //services
        services.AddScoped<IBookService, BookService>();
        services.AddScoped<ICategoryService, CategoryService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IBorrowingRequestService, BorrowingRequestService>();

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options => {
            options.TokenValidationParameters = new TokenValidationParameters {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = configuration["JwtSettings:Issuer"],
                ValidAudience = configuration["JwtSettings:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtSettings:SecretKey"]))
            };
        });

        services.AddCors(options => {
            options.AddPolicy(
                name: "MyAllowOrigins",
                policy => {
                    policy.WithOrigins("http://localhost:3000");
                }
            );
            options.AddDefaultPolicy(options => {
                options.WithOrigins("*").AllowAnyHeader().AllowAnyMethod();
            });
        });

        services.AddDbContext<LibraryManagementContext>(
            options => options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"))
        );

        services.AddAutoMapper(typeof(MapperProfile));
        return services;
    }
}