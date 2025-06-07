import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./app.css";
import FormInput from "./components/FormInput";

const App = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneCode: "",
    phoneNumber: "",
    country: "",
    city: "",
    pan: "",
    aadhar: "",
    password: "",
    confirmPassword: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const inputs = [
    { id: 1, name: "firstName", type: "text", label: "First Name", placeholder: "John", required: true, errorMessage: "First name is required!" },
    { id: 2, name: "lastName", type: "text", label: "Last Name", placeholder: "Doe", required: true, errorMessage: "Last name is required!" },
    { id: 3, name: "username", type: "text", label: "Username", placeholder: "johndoe123", pattern: "^[A-Za-z0-9]{3,16}$", required: true, errorMessage: "3-16 characters, no special chars." },
    { id: 4, name: "email", type: "email", label: "Email", placeholder: "john@example.com", required: true, errorMessage: "Enter a valid email!" },
    { id: 5, name: "phoneCode", type: "text", label: "Country Code", placeholder: "+91", pattern: "^\\+?[0-9]{1,4}$", required: true, errorMessage: "Invalid code!" },
    { id: 6, name: "phoneNumber", type: "text", label: "Phone Number", placeholder: "9876543210", pattern: "^[0-9]{10}$", required: true, errorMessage: "Enter 10-digit phone number!" },
    { id: 7, name: "country", type: "select", label: "Country", required: true, options: ["India", "USA", "Canada"], errorMessage: "Select a country!" },
    { id: 8, name: "city", type: "select", label: "City", required: true, options: ["Mumbai", "New York", "Toronto"], errorMessage: "Select a city!" },
    { id: 9, name: "pan", type: "text", label: "PAN No", placeholder: "ABCDE1234F", pattern: "[A-Z]{5}[0-9]{4}[A-Z]{1}", required: true, errorMessage: "Invalid PAN format!" },
    { id: 10, name: "aadhar", type: "text", label: "Aadhar No", placeholder: "123412341234", pattern: "^[0-9]{12}$", required: true, errorMessage: "Aadhar must be 12 digits!" },
    { id: 11, name: "password", type: showPassword ? "text" : "password", label: "Password", placeholder: "********", pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$`, required: true, errorMessage: "Min 8 chars, 1 number, 1 special char" },
    { id: 12, name: "confirmPassword", type: showPassword ? "text" : "password", label: "Confirm Password", placeholder: "********", pattern: values.password, required: true, errorMessage: "Passwords do not match!" },
  ];

  useEffect(() => {
    const allValid = inputs.every((input) => {
      const value = values[input.name];
      const regex = input.pattern ? new RegExp(input.pattern) : null;
      return (
        value &&
        (!regex || regex.test(value)) &&
        (input.type !== "select" || value !== "")
      );
    });
    setIsFormValid(allValid);
  }, [values]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) navigate("/success", { state: values });
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {inputs.map((input) =>
          input.type === "select" ? (
            <div key={input.id} className="formInput">
              <label>{input.label}</label>
              <select name={input.name} onChange={onChange} value={values[input.name]} required>
                <option value="">Select</option>
                {input.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <span>{input.errorMessage}</span>
            </div>
          ) : (
            <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
          )
        )}
        <div>
          <label>
            <input type="checkbox" onChange={() => setShowPassword(!showPassword)} /> Show Password
          </label>
        </div>
        <button disabled={!isFormValid}>Submit</button>
      </form>
    </div>
  );
};

export default App;
