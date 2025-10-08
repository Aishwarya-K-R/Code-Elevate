import React from 'react';
import API from '../api_config/api';

function DeleteCategory({ setCat, id }) {

  const deleteHandler = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete the selected category?"
      );
      if (confirmDelete) {
        await API.delete(`/admin/delete/category/${id}`);
        setCat(prev => prev.filter(c => c.id !== id));
        alert("Category deleted successfully!");
      }
    } 
    catch (err) {
      alert(err.response?.data || "Deletion failed");
    }
  };

  return (
    <button
      onClick={deleteHandler}
      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
    >
      Delete
    </button>
  );
}

export default DeleteCategory;
