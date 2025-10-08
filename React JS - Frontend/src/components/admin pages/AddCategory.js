import React from 'react';
import API from '../api_config/api';

function AddCategory({ setAddForm, setCat, setAddCatForm, addCatForm }) {

  const changeHandler = (e) => {
    setAddCatForm({ ...addCatForm, [e.target.name]: e.target.value });
  };

  const saveCatHandler = async () => {
    try {
      const details = { ...addCatForm };
      const result = await API.post('/admin/add/category', details);
      setCat(prev => [...prev, result.data]);
      setAddCatForm({ name: "", description: "" });
      setAddForm(false);
      alert("Category added successfully!!");
    } 
    catch (err) {
      alert(err.response?.data);
    }
  };

  const cancelHandler = () => {
    setAddCatForm({ name: "", description: "" });
    setAddForm(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Add Category Form</h2>
        <input
          type="text"
          name="name"
          placeholder="Enter category name"
          value={addCatForm.name}
          onChange={changeHandler}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          name="description"
          placeholder="Enter category description"
          value={addCatForm.description}
          onChange={changeHandler}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={saveCatHandler}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Save
          </button>
          <button
            onClick={cancelHandler}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
