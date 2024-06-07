using System.Transactions;
using AutoMapper;
using LibraryManagement.Backend.Infrastructure.Models;
using LibraryManagement.Backend.Infrastructure.Repositories;
using LibraryManagement.Backend.Shared;
using LibraryManagement.Backend.WebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagement.Backend.WebAPI.Services;

public class BorrowingRequestService : IBorrowingRequestService
{
    private readonly IBorrowingRequestRepository _borrowingRequestRepository;
    private readonly IBookRepository _bookRepository;
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    public BorrowingRequestService(IBorrowingRequestRepository borrowingRequestRepository, IBookRepository bookRepository, IUserRepository userRepository, IMapper mapper)
    {
        _borrowingRequestRepository = borrowingRequestRepository;
        _bookRepository = bookRepository;
        _userRepository = userRepository;
        _mapper = mapper;
    }
    public async Task<BorrowingResponseModel> CreateRequestAsync(BorrowingRequestModel request)
    {
        var user = await _userRepository.GetByIdAsync(request.RequestorId) ?? throw new ArgumentException("Requestor not found");
        if (request.Books.Count() > 5) throw new InvalidOperationException("Users can only borrow up to 5 books at a time");
        var requestsThisMonth = _borrowingRequestRepository.GetAllQueryable()
            .Where(r => r.RequestorId == request.RequestorId && r.RequestedAt.Month == DateTime.Now.Month && r.RequestedAt.Year == DateTime.Now.Year)
            .Count();
        if (requestsThisMonth >= 3) throw new InvalidOperationException("Users can only borrow 3 requests per month");

        var newRequest = _mapper.Map<BookBorrowingRequest>(request);
        newRequest.Details = [];
        var response = _mapper.Map<BorrowingResponseModel>(newRequest);
        response.Requestor = _mapper.Map<UserResponseModel>(user);
        response.Books = new List<BookResponseModel>();
        if (request.Books.Count == 0) throw new ArgumentException("No books provided");
        foreach (var bookId in request.Books)
        {
            var book = await _bookRepository.GetByIdAsync(bookId) ?? throw new ArgumentException("Book not found");
            var newDetails = new BookBorrowingRequestDetails
            {
                BookId = bookId,
                BookBorrowingRequestId = newRequest.Id
            };
            newRequest.Details.Add(newDetails);
            response.Books.Add(_mapper.Map<BookResponseModel>(book));
        }
        await _borrowingRequestRepository.InsertAsync(newRequest);

        return response;
    }

    public async Task<BorrowingPaginationResponseModel> GetAllRequestsAsync(Guid? requestorId, Guid? approverId, BorrowingStatusType? status, int page, int perPage, string search)
    {
        var requestsQuery = _borrowingRequestRepository.GetAllQueryable();
        if (requestorId != null) requestsQuery = requestsQuery.Where(r => r.RequestorId == requestorId);
        if (approverId != null) requestsQuery = requestsQuery.Where(r => r.ApproverId == approverId);
        if (status != null) requestsQuery = requestsQuery.Where(r => r.Status == status);
        if (!string.IsNullOrEmpty(search)) requestsQuery = requestsQuery
            .Where(r => r.Requestor.FullName.Contains(search)
                    || r.Requestor.Username.Contains(search)
                    || r.RequestorId.ToString().Contains(search)
                    || r.Approver.FullName.Contains(search)
                    || r.Approver.Username.Contains(search));

        var pagedRequests = await requestsQuery.OrderByDescending(r => r.RequestedAt).Skip((page - 1) * perPage).Take(perPage).ToListAsync();
        var responseRequests = pagedRequests.Select(_mapper.Map<BorrowingResponseModel>).ToList();
        for (int i = 0; i < pagedRequests.Count(); i++)
        {
            var request = pagedRequests.ElementAt(i);
            var response = responseRequests.ElementAt(i);
            response.Books = [];
            foreach (var details in request.Details)
            {
                var book = await _bookRepository.GetByIdAsync(details.BookId);
                response.Books.Add(_mapper.Map<BookResponseModel>(book));
            }
        }
        var paginatedResponse = new BorrowingPaginationResponseModel
        {
            TotalCount = await requestsQuery.CountAsync(),
            Data = responseRequests
        };
        return paginatedResponse;
    }

    public async Task<BorrowingResponseModel> GetRequestByIdAsync(Guid id)
    {
        var request = await _borrowingRequestRepository.GetByIdAsync(id) ?? throw new KeyNotFoundException("Borrowing request not found");
        var response = _mapper.Map<BorrowingResponseModel>(request);
        response.Books = [];
        foreach (var details in request.Details)
        {
            var book = await _bookRepository.GetByIdAsync(details.BookId);
            response.Books.Add(_mapper.Map<BookResponseModel>(book));
        }
        return response;
    }

    public async Task UpdateRequestAsync(Guid id, Guid approverId, BorrowingStatusType status)
    {
        var existingRequest = await _borrowingRequestRepository.GetByIdAsync(id) ?? throw new KeyNotFoundException("Borrowing request not found");
        var approver = await _userRepository.GetByIdAsync(approverId) ?? throw new ArgumentException("Approver not found");
        if (approver.Role != UserRoleType.Super) throw new ArgumentException("Only super users can approve requests");
        existingRequest.ApproverId = approverId;
        existingRequest.Status = status;
        _borrowingRequestRepository.Update(existingRequest);
    }
}