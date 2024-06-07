import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "../../../components/InputField";
import {
  getCategoryDetails,
  updateCategory,
} from "../../../services/categories";

const EditCategory = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    getCategoryDetails(id)
      .then((res) => {
        setFormData(res);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleValueOnChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleFormSubmit = () => {
    updateCategory(id, formData);
    navigate("/categories");
  };

  return (
    <div className="min-h-full pt-[80px]">
      <div className="flex items-center justify-center pt-[20px]">
        <form onSubmit={handleFormSubmit} className="w-[500px]">
          <div className="mb-[12px] text-2xl font-medium">Edit a category</div>
          <div className="w-full">
            <InputField
              name="name"
              id="id"
              value={formData.name}
              onChange={handleValueOnChange}
              label="Name"
              width="full"
              required={true}
            />
            <InputField
              type="textarea"
              name="description"
              id="description"
              value={formData.description}
              onChange={handleValueOnChange}
              label="Description"
              width="full"
              required={true}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
