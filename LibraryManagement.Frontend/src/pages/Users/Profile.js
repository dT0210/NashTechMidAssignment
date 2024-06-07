import { useEffect, useState } from "react";
import RequestListTable from "../../components/BorrowingRequests/RequestListTable";
import Pagination from "../../components/Pagination";
import { useAuthContext } from "../../contexts/AuthContext";
import { getListBorrowingRequestByRequestorId } from "../../services/booksBorrowing";

const Profile = () => {
  const { user } = useAuthContext();
  const [requests, setRequests] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage, setRequestsPerPage] = useState(10);
  const [status, setStatus] = useState("");
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [searchQuery, setSearchQuery] = useState("");
  const fetchRequests = () => {
    const params = {
      page: currentPage,
      perPage: requestsPerPage,
      search: searchQuery,
    };
    if (status !== "") {
      params.status = parseInt(status);
    }
    getListBorrowingRequestByRequestorId(user.id, params)
      .then((result) => {
        setRequests(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(user);
  useEffect(() => {
    fetchRequests();
  }, [status, currentPage, searchQuery, requestsPerPage]);

  return (
    <div className="mt-[80px] min-h-full p-[20px]">
      <div>
        <div className="text-3xl font-semibold">{user.username}</div>
        <div>{user.email}</div>
      </div>
      <div>
        <div className="my-6 flex justify-between">
          <select
            name="status"
            id="status"
            className="rounded-md border border-black"
            onChange={(e) => {
              setStatus(e.target.value);
            }}
            defaultValue=""
          >
            <option value="" disabled>
              Filter by Status
            </option>
            <option value={2}>Waiting</option>
            <option value={0}>Approved</option>
            <option value={1}>Rejected</option>
          </select>
          <div className="flex w-[400px] items-center justify-center">
            <div className="font-medium">Search</div>
            <input
              type="text"
              className="ml-4 w-full border border-slate-200 px-2 py-1 shadow-md focus:outline-none"
              placeholder="Search username, id"
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
          </div>
        </div>
        <RequestListTable
          requests={requests?.data}
          onUpdateStatus={fetchRequests}
          admin={false}
        />
        <div className="mt-3 flex justify-end">
          <Pagination
            itemsPerPage={requestsPerPage}
            totalCount={requests?.totalCount}
            currentPage={currentPage}
            handlePagination={handlePagination}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
