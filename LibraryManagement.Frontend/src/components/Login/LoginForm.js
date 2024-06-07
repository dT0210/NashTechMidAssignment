import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { login } from "../../services/users";
import InputField from "../InputField";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { setIsAuthenticated, setUser } = useAuthContext();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleForm = (event) => {
    event.preventDefault();
    login(formData)
      .then((result) => {
        localStorage.setItem("token", result.token);
        setIsAuthenticated(true);
        navigate("/books");
      })
      .catch((error) => {
        setError(error);
      });
  };
  const handleValueOnChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  return (
    <form
      onSubmit={handleForm}
      className="flex h-[400px] w-[600px] flex-col items-center justify-between rounded-md border border-slate-300 bg-white p-8 shadow-md"
    >
      <div className="text-3xl font-semibold">LOG IN</div>
      <div className="flex flex-col gap-2">
        <InputField
          required={true}
          value={formData.username}
          name="username"
          id="username"
          type="text"
          label="Username"
          onChange={handleValueOnChange}
          placeholder="Enter username"
        />
        <InputField
          required={true}
          value={formData.password}
          name="password"
          id="password"
          type="password"
          label="Password"
          onChange={handleValueOnChange}
          placeholder="Enter password"
        />
        {error && (
          <div className="italic text-red-600">
            Incorrect username or password
          </div>
        )}
      </div>
      <button className="rounded-md bg-[#d6001c] px-6 py-3 font-medium text-white">
        Log in
      </button>
    </form>
  );
};

export default LoginForm;
