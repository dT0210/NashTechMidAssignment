import { Link, useNavigate } from "react-router-dom";
import { deleteCategory } from "../../services/categories";

const CategoryListTable = (props) => {
  const { categories, onDelete } = props;

  const navigate = useNavigate();

  const handleDeleteCategory = (id) => {
    const confirm = window.confirm(
      "Do you really want to delete this category",
    );
    if (confirm) {
      deleteCategory(id)
        .then(() => {
          onDelete();
          navigate("/categories");
        })
        .catch((error) => {
          alert(error.response.data);
        });
    }
  };

  return (
    <div>
      <table className="w-full border-collapse border border-black">
        <thead>
          <tr>
            <th className="w-[300px] border border-black">Name</th>
            <th className="border border-black">Description</th>
            <th className="w-[240px] border border-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category) => (
            <tr key={category.id}>
              <td className="px-4 text-center">{category.name}</td>
              <td className="px-4 text-center">{category.description}</td>
              <td className="">
                <div className="flex h-full items-center justify-center gap-2">
                  <Link
                    to={`edit/${category.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded bg-yellow-600 px-3 py-1 text-white"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => {
                      handleDeleteCategory(category.id);
                    }}
                    className="rounded bg-[#d6001c] px-3 py-1 text-white"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryListTable;
