import React from 'react';
import API from '../api_config/api';

function AddProduct({ addProdForm, setAddProdForm, catName, setProd, setShowAddForm }) {

  const addChangeHandler = (e) => {
    setAddProdForm({ ...addProdForm, [e.target.name]: e.target.value });
  };

  const addProdHandler = async () => {
    try {
      const category = { name: catName };
      const result = await API.post('/admin/add/product', { ...addProdForm, category });
      setProd(prev => [...prev, result.data]);
      setAddProdForm({ name: "", price: "", stock: "" });
      setShowAddForm(false);
      alert('Product added successfully !!');
    } 
    catch (err) {
      alert(err.response?.data || "Failed to add product");
    }
  };

  const cancelHandler = () => {
    setAddProdForm({ name: "", price: "", stock: "" });
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Product</h2>

        <input
          type="text"
          name="name"
          placeholder="Enter product name"
          value={addProdForm.name}
          onChange={addChangeHandler}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          name="price"
          placeholder="Enter product price"
          value={addProdForm.price}
          onChange={addChangeHandler}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          name="stock"
          placeholder="Enter product stock"
          value={addProdForm.stock}
          onChange={addChangeHandler}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={addProdHandler}
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

export default AddProduct;
