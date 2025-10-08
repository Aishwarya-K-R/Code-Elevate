import React, { useEffect, useState } from "react";
import API from "../api_config/api";
import { useParams } from "react-router-dom";

function ViewDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState({ name: false, email: false, password: false });
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const uid = localStorage.getItem("id");
        const details = await API.get(`/user/${uid}`);
        setUser(details.data);
        setFormData({
          name: details.data.name,
          email: details.data.email,
          password: "" 
        });
      } catch (err) {
        alert(err);
      }
    };
    fetchDetails();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (field) => {
    try {
      const uid = localStorage.getItem("id");
      const updated = { ...user, [field]: formData[field] };
      const res = await API.put(`/user/${uid}`, updated);
      setUser(res.data);
      setIsEditing({ ...isEditing, [field]: false });
    } catch (err) {
      alert(err.response?.data);
    }
  };

  if (!user) return <h2 className="text-center mt-10">Loading...</h2>;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">My Details</h1>

      <div className="space-y-6">
        {/* Name */}
        <div>
          <h2 className="text-lg font-semibold">Name:</h2>
          {isEditing.name ? (
            <div className="flex gap-2 mt-2">
              <input 
                className="border px-2 py-1 rounded w-full"
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
              />
              <button 
                onClick={() => handleSave("name")} 
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex justify-between mt-2">
              <span>{user.name}</span>
              <button 
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setIsEditing({ ...isEditing, name: true })}
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Email */}
        <div>
          <h2 className="text-lg font-semibold">Email:</h2>
          {isEditing.email ? (
            <div className="flex gap-2 mt-2">
              <input 
                className="border px-2 py-1 rounded w-full"
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
              />
              <button 
                onClick={() => handleSave("email")} 
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex justify-between mt-2">
              <span>{user.email}</span>
              <button 
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setIsEditing({ ...isEditing, email: true })}
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Role */}
        <div>
          <h2 className="text-lg font-semibold">Role:</h2>
          <p className="mt-2">{user.role}</p>
        </div>

        {/* Password */}
        <div>
          <h2 className="text-lg font-semibold">Password:</h2>
          {isEditing.password ? (
            <div className="flex gap-2 mt-2">
              <input
                type="password"
                name="password"
                className="border px-2 py-1 rounded w-full"
                value={formData.password}
                onChange={handleChange}
              />
              <button 
                onClick={() => handleSave("password")} 
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex justify-between mt-2">
              <span>********</span>
              <button 
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setIsEditing({ ...isEditing, password: true })}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewDetails;
