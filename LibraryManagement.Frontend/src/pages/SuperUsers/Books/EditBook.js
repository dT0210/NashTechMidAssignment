import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "../../../components/InputField";
import SearchableDropdown from "../../../components/SearchableDropdown";
import { getBookDetails, updateBook } from "../../../services/books";
import { getListCategories } from "../../../services/categories";

const EditBook = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: null,
    isAvailable: true,
    cover: "",
    description: "",
  });

  useEffect(() => {
    getBookDetails(id)
      .then((res) => {
        setFormData(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleValueOnChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (formData.categoryId === null) {
      alert("Please select a category");
      return;
    }
    updateBook(id, {
      title: formData.title,
      author: formData.author,
      categoryId: formData.category.id,
      isAvailable: formData.isAvailable,
      description: formData.description,
      cover: formData.cover,
    })
      .then(() => {
        navigate("/books");
      })
      .catch((error) => {
        console.log(error);
        alert("Can't update book");
      });
  };

  useEffect(() => {
    getListCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="min-h-full pt-[80px]">
      <div className="flex items-center justify-center pt-[20px]">
        <form onSubmit={handleFormSubmit} className="">
          <div className="mb-[12px] text-2xl font-medium">Edit a book</div>
          <table className="border-separate border-spacing-3">
            <tr>
              <td>
                <InputField
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleValueOnChange}
                  label="Title"
                  required={true}
                />
              </td>
              <td>
                <InputField
                  name="author"
                  id="author"
                  value={formData.author}
                  onChange={handleValueOnChange}
                  label="Author"
                  required={true}
                />
              </td>
            </tr>
            <tr>
              <td>
                <SearchableDropdown
                  label="Category"
                  options={categories?.data}
                  selected={formData.category}
                  onOptionClick={(option) => {
                    setFormData({ ...formData, categoryId: option.id });
                  }}
                />
              </td>
              <td>
                <SearchableDropdown
                  label="Status"
                  options={[
                    { name: "Available", value: true },
                    { name: "Unavailable", value: false },
                  ]}
                  selected={
                    formData.isAvailable
                      ? { name: "Available", value: true }
                      : { name: "Unavailable", value: false }
                  }
                  onOptionClick={(option) => {
                    setFormData({ ...formData, isAvailable: option.value });
                  }}
                  searchable={false}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <InputField
                  name="cover"
                  id="cover"
                  value={formData.cover}
                  onChange={handleValueOnChange}
                  label="Cover link"
                  width="full"
                  required={true}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <InputField
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleValueOnChange}
                  label="Description"
                  type="textarea"
                  width="full"
                  required={true}
                />
              </td>
            </tr>
          </table>
          <button className="mx-auto block rounded-md bg-[#d6001c] px-6 py-3 font-medium text-white">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
