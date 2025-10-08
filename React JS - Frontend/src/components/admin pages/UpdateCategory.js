import React from 'react';
import API from '../api_config/api';
import DeleteCategory from './DeleteCategory';
import { useNavigate } from 'react-router-dom';

function UpdateCategory({ access, form, c, setForm, setEditId, setCat, cat, editId }) {
  const navigate = useNavigate();

  const saveHandler = async (id) => {
    try {
      const update = { ...form };
      const result = await API.put(`/admin/update/category/${id}`, update);
      setCat(
        cat.map((item) =>
          item.id === id ? { ...item, name: result.data.name, description: result.data.description } : item
        )
      );
      setEditId(null);
      alert("Category updated successfully!!");
    } 
    catch (err) {
      alert(err.response?.data || "Update failed");
    }
  };

  const editHandler = (c) => {
    setEditId(c.id);
    setForm({ name: c.name, description: c.description });
  };

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const viewHandler = () => {
    if (access) {
      navigate(`/admin/products/category/${c.name}`);
    } 
    else {
      navigate(`/user/products/category/${c.name}`);
    }
  };

  return (
    <>
      <td className="py-2 px-4">
        {c.id === editId ? (
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={changeHandler}
            className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ) : (
          c.name
        )}
      </td>
      <td className="py-2 px-4">
        {c.id === editId ? (
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={changeHandler}
            className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ) : (
          c.description
        )}
      </td>
      <td className="py-2 px-4 flex gap-2">
        {c.id === editId ? (
          <>
            <button
              onClick={() => saveHandler(c.id)}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Save
            </button>
            <button
              onClick={() => setEditId(null)}
              className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={viewHandler}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              View
            </button>
            {access && (
              <>
                <button
                  onClick={() => editHandler(c)}
                  className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                >
                  Edit
                </button>
                <DeleteCategory id={c.id} setCat={setCat} />
              </>
            )}
          </>
        )}
      </td>
    </>
  );
}

export default UpdateCategory;
