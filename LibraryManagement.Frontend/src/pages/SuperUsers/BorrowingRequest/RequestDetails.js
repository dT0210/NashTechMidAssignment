import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookListTable from "../../../components/Books/BookListTable";
import {
  getBorrowingRequestById,
  updateBorrowingRequest,
} from "../../../services/booksBorrowing";

const RequestDetails = () => {
  const { id } = useParams();
  const [request, setRequest] = useState();
  useEffect(() => {
    getBorrowingRequestById(id).then((res) => {
      setRequest(res);
    });
  }, [id]);

  const handleUpdateStatus = (id, status) => {
    const confirm = window.confirm("Are you sure?");
    if (!confirm) return;
    updateBorrowingRequest(id, parseInt(status))
      .then(() => {
        alert("Status updated successfully");
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="min-h-full p-[20px] pt-[100px]">
      <div className="h-full w-full">
        <div className="mb-4 text-3xl font-semibold">Request details</div>
        <div className="text-2xl">
          <div>
            Requested at: {new Date(request?.requestedAt).toLocaleString()}
          </div>
          <div>
            Status:{" "}
            {request?.status === 0 ? (
              <span className="text-green-600">Approved</span>
            ) : request?.status === 1 ? (
              <span className="text-red-700">Rejected</span>
            ) : (
              <span className="text-amber-500">Waiting</span>
            )}
            <span className="text-white">
              {request?.status === 2 && (
                <>
                  <button
                    className="rounded-md bg-green-600 px-3 py-1"
                    onClick={() => {
                      handleUpdateStatus(request.id, 0);
                    }}
                  >
                    Approve
                  </button>
                  <button
                    className="rounded-md bg-red-700 px-3 py-1"
                    onClick={() => {
                      handleUpdateStatus(request.id, 1);
                    }}
                  >
                    Reject
                  </button>
                </>
              )}
            </span>
          </div>
        </div>
        <div className="mt-[20px]">
          <div className="text-2xl">Books requested</div>
          <BookListTable books={request?.books} />
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;
