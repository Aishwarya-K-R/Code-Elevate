import React, { useState } from "react";
import API from "../api_config/api";
import { jwtDecode } from "jwt-decode"; 
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", formData);
      const token = res.data.split("Token : ")[1];
      localStorage.setItem("token", token);

      const decodedToken = jwtDecode(token);
      localStorage.setItem("role", decodedToken.role);
      localStorage.setItem("name", decodedToken.name);
      localStorage.setItem("id", decodedToken.sub);

      setMessage("Login Successful !!");

      if (decodedToken.role === "ADMIN") {
        navigate("/admin");
      } else if (decodedToken.role === "USER") {
        navigate("/user");
      }
    } catch (err) {
      setMessage(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="mt-2 p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
          <div className="flex justify-center mt-4">
  <Link 
    to="/forgotPassword" 
    className="text-blue-600 underline hover:text-blue-800 transition"
  >
    Forgot Password ?
  </Link>
</div> 
        </form>

        {message && (
          <p className="mt-4 text-center text-red-500 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
