import React from 'react';
import API from '../api_config/api';

function DeleteProduct({ setProd, p }) {
  const deleteHandler = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete the selected product?"
      );
      if (confirmDelete) {
        const response = await API.delete(`/admin/delete/product/${id}`);
        setProd((prev) => prev.filter((prod) => prod.id !== id));
        alert(response.data);
      }
    } 
    catch (err) {
      alert(err.response?.data || "Failed to delete product");
    }
  };

  return (
    <button
      onClick={() => deleteHandler(p.id)}
      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
    >
      Delete
    </button>
  );
}

export default DeleteProduct;
