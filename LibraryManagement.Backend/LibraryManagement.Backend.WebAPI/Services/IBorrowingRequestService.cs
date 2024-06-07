using LibraryManagement.Backend.Shared;
using LibraryManagement.Backend.WebAPI.Models;

namespace LibraryManagement.Backend.WebAPI.Services;

public interface IBorrowingRequestService
{
    Task<BorrowingPaginationResponseModel> GetAllRequestsAsync(Guid? requestorId, Guid? approverId, BorrowingStatusType? status, int page, int perPage, string search);
    Task<BorrowingResponseModel> GetRequestByIdAsync(Guid id);
    Task<BorrowingResponseModel> CreateRequestAsync(BorrowingRequestModel request);
    Task UpdateRequestAsync(Guid id, Guid approverId, BorrowingStatusType status);
}