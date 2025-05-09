import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    phone_number: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error messages

    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/login/", formData);
      
      // যদি লগইন সফল হয়, ইউজারকে ওয়েলকাম পেইজে রিডিরেক্ট করুন
      if (response.data.message) {
        navigate("/welcome"); // Redirect to welcome page
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // Display error message from backend
        setErrorMessage(error.response.data.error || "Login failed");
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* Display error message */}
    </div>
  );
}

export default Login;
