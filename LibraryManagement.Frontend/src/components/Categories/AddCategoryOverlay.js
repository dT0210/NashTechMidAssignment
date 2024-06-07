import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useClickOutside from "../../hooks/useClickOutside";
import { createCategory } from "../../services/categories";
import InputField from "../InputField";

const AddCategoryOverlay = (props) => {
  const { display, onClose, onSubmit } = props;
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

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
    createCategory(formData)
      .then(() => {
        onSubmit();
        setFormData({
          name: "",
          description: "",
        });
        navigate("/categories");
        onClose();
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };

  const modalRef = useClickOutside(onClose);

  return (
    <div
      className={`absolute left-0 top-0 z-50 h-full w-full bg-black bg-opacity-40 pt-[80px] ${display ? "block" : "hidden"}`}
    >
      <div
        ref={modalRef}
        className="relative mx-auto flex h-[80%] w-[80%] items-center justify-center rounded-2xl bg-white pt-[20px]"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 bg-transparent text-xl font-semibold text-black"
        >
          &#10005;
        </button>
        <form action="" onSubmit={handleFormSubmit} className="w-[400px]">
          <div className="mb-[12px] text-2xl font-medium">
            Add a new category
          </div>
          <table className="w-full border-separate border-spacing-4">
            <tr>
              <td colSpan={2}>
                <InputField
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleValueOnChange}
                  label="Name"
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

export default AddCategoryOverlay;
