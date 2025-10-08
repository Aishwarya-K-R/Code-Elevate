import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api_config/api';

function ForgotPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({email : "", password : "", newPassword : ""});
  const [message, setMessage] = useState("");

  const changeHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await API.put('/forgotPassword', { ...formData });
    setMessage("Password updated successfully !!");
    
    setTimeout(() => {
      navigate('/login');
    }, 1000);

  } catch (err) {
    setMessage(err.response?.data || "Something went wrong!");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Forgot Password</h2>

        <form className="flex flex-col gap-4">

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={changeHandler}
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter New Password"
            value={formData.password}
            onChange={changeHandler}
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            name="newPassword"
            placeholder="Confirm Password"
            value={formData.newPassword}
            onChange={changeHandler}
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            className="mt-2 p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
            onClick={handleSubmit}
          >
            Save
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-red-500 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword