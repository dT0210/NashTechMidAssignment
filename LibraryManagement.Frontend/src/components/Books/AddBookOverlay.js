import { useEffect, useState } from "react";
import InputField from "../../components/InputField";
import useClickOutside from "../../hooks/useClickOutside";
import { createBook } from "../../services/books";
import { getListCategories } from "../../services/categories";
import SearchableDropdown from "../SearchableDropdown";

const AddBookOverlay = (props) => {
  const { display, onClose } = props;
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    categoryId: null,
    isAvailable: true,
    description: "",
    cover: "",
  });

  const handleValueOnChange = (event) => {
    const { name, value } = event.target;
    let parsedValue = value;

    if (name === "isAvailable") {
      parsedValue = value === "true";
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: parsedValue,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (formData.categoryId === null) {
      alert("Please select a category");
      return;
    }
    createBook(formData)
      .then(() => {
        window.location.reload();
        onClose();
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };

  const modalRef = useClickOutside(onClose);

  useEffect(() => {
    getListCategories({ perPage: 10000 })
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data);
      });
  }, []);

  return (
    <div
      className={`absolute left-0 top-0 z-50 h-full w-full bg-black bg-opacity-40 pt-[80px] ${display ? "block" : "hidden"}`}
    >
      <div
        ref={modalRef}
        className="relative mx-auto flex h-[90%] w-[80%] items-center justify-center rounded-2xl bg-white pt-[20px]"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 bg-transparent text-xl font-semibold text-black"
        >
          &#10005;
        </button>
        <form onSubmit={handleFormSubmit} className="">
          <div className="mb-[12px] text-2xl font-medium">Add a new book</div>
          <table className="border-separate border-spacing-4">
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
                  options={categories}
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
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookOverlay;
