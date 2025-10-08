import React, { useEffect, useState } from 'react';
import API from '../api_config/api';
import AddCategory from '../admin pages/AddCategory';
import UpdateCategory from '../admin pages/UpdateCategory';

function Categories() {
  const [access, setAccess] = useState(false);
  const [cat, setCat] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [editId, setEditId] = useState(null);
  const [addForm, setAddForm] = useState(false);
  const [addCatForm, setAddCatForm] = useState({ name: "", description: "" });

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === 'ADMIN') setAccess(true);

    const getCategories = async () => {
      try {
        const categories = await API.get('/categories');
        setCat(categories.data);
      } catch (err) {
        alert(err.response?.data || "Something went wrong");
      }
    };
    getCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Categories Page</h1>
          {access && (
            <button
              className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
              onClick={() => setAddForm(true)}
            >
              Add Category
            </button>
          )}
        </div>

        {addForm && (
          <AddCategory
            addCatForm={addCatForm}
            setAddCatForm={setAddCatForm}
            setCat={setCat}
            setAddForm={setAddForm}
          />
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white text-left">
              <tr>
                <th className="py-3 px-4">Sl No.</th>
                <th className="py-3 px-4">Category Id</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cat.map((c, index) => (
                <tr key={c.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{c.id}</td>
                    <UpdateCategory
                      access={access}
                      c={c}
                      form={form}
                      setForm={setForm}
                      editId={editId}
                      setEditId={setEditId}
                      cat={cat}
                      setCat={setCat}
                    />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Categories;
