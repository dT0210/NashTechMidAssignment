import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { updateBorrowingRequest } from "../../services/booksBorrowing";

const RequestListTable = (props) => {
  const { requests, onUpdateStatus } = props;
  const { user } = useAuthContext();
  const handleUpdateStatus = (id, status) => {
    const confirm = window.confirm("Are you sure?");
    if (!confirm) return;
    updateBorrowingRequest(id, parseInt(status))
      .then(() => {
        alert("Status updated successfully");
        onUpdateStatus();
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <table className="w-full border-collapse border border-black text-center">
      <thead>
        <tr className="h-[40px] border border-black">
          <th className="w-[200px]">Requested At</th>
          <th className="w-[300px]">Requestor</th>
          <th>Status</th>
          <th className="w-[300px]">Approver</th>
          <th className="w-[200px]">Action</th>
        </tr>
      </thead>
      <tbody>
        {requests?.map((request) => {
          let date = new Date(request.requestedAt);
          return (
            <tr key={request.id} className="h-[40px] border-b border-slate-200">
              <td>{date.toLocaleString()}</td>
              <td>{request.requestor?.username}</td>
              <td className="font-medium">
                {request.status === 0 ? (
                  <span className="text-green-600">Approved</span>
                ) : request.status === 1 ? (
                  <span className="text-red-700">Rejected</span>
                ) : (
                  <span className="text-amber-500">Waiting</span>
                )}
              </td>
              <td>{request.approver?.username}</td>
              <td className="flex justify-center gap-2 text-white">
                <Link
                  to={`/requests/${request.id}`}
                  className="rounded bg-[green] px-3 py-1"
                >
                  Details
                </Link>
                {user.role === "Super" && request.status === 2 && (
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
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default RequestListTable;
