import { useEffect, useState } from "react";
import AddCategoryOverlay from "../../../components/Categories/AddCategoryOverlay";
import CategoryListTable from "../../../components/Categories/CategoryListTable";
import Pagination from "../../../components/Pagination";
import { getListCategories } from "../../../services/categories";

const Categories = () => {
  const [addCategoryDisplay, setAddCategoryDisplay] = useState(false);

  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage, setCategoriesPerPage] = useState(10);
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchCategories = () => {
    const params = {
      page: currentPage,
      perPage: categoriesPerPage,
    };
    getListCategories(params)
      .then((result) => {
        setCategories(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (
      categories?.items <= (currentPage - 1) * categoriesPerPage &&
      currentPage > 1
    )
      setCurrentPage(currentPage - 1);
  }, [categories]);

  return (
    <div className="mt-[80px] min-h-full p-[20px]">
      <div className="mb-6">
        <button
          onClick={() => {
            setAddCategoryDisplay(true);
            document.body.classList.add("overflow-hidden");
          }}
          className="rounded-lg bg-[#d6001c] px-4 py-2 font-semibold text-white hover:bg-white hover:text-[#d6001c] hover:outline hover:outline-[#d6001c]"
        >
          Add
        </button>
      </div>
      <CategoryListTable
        categories={categories?.data}
        onDelete={fetchCategories}
      />
      <div className="mt-6 flex w-full justify-end">
        <Pagination
          totalCount={categories?.totalCount}
          itemsPerPage={categoriesPerPage}
          currentPage={currentPage}
          handlePagination={handlePagination}
        />
      </div>
      <AddCategoryOverlay
        display={addCategoryDisplay}
        onClose={() => {
          setAddCategoryDisplay(false);
          document.body.classList.remove("overflow-hidden");
        }}
        onSubmit={fetchCategories}
      />
    </div>
  );
};

export default Categories;
