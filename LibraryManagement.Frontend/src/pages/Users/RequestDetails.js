import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookListTable from "../../components/Books/BookListTable";
import { getBorrowingRequestById } from "../../services/booksBorrowing";

const RequestDetails = () => {
  const { id } = useParams();
  const [request, setRequest] = useState();
  useEffect(() => {
    getBorrowingRequestById(id).then((res) => {
      setRequest(res);
    });
  }, [id]);

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
