import React, { useEffect, useState } from 'react';
import API from '../api_config/api';
import { useNavigate, useParams } from 'react-router-dom';
import AddProduct from '../admin pages/AddProduct';
import UpdateProduct from '../admin pages/UpdateProduct';

function Products() {
  const navigate = useNavigate();
  const { catName } = useParams();
  const [form, setForm] = useState({ name: "", price: "", stock: "" });
  const [prodId, setProdId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [prod, setProd] = useState([]);
  const [addProdForm, setAddProdForm] = useState({ name: "", price: "", stock: "" });
  const [access, setAccess] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === 'ADMIN') setAccess(true);

    const fetchProducts = async () => {
      try {
        const products = await API.get('/products/category', { params: { category: catName } });
        setProd(products.data);
      } catch (err) {
        alert(err.response?.data || "Failed to fetch products");
      }
    };
    fetchProducts();
  }, [catName]);

  const viewCartHandler = () => navigate(`/user/view/cart`);

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Products Page</h1>
          {!access ? (
            <button
              className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
              onClick={viewCartHandler}
            >
              View Cart
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              onClick={() => setShowAddForm(true)}
            >
              Add Product
            </button>
          )}
        </div>

        {showAddForm && (
          <AddProduct
            addProdForm={addProdForm}
            setAddProdForm={setAddProdForm}
            catName={catName}
            setProd={setProd}
            setShowAddForm={setShowAddForm}
          />
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white text-left">
              <tr>
                <th className="py-3 px-4">Sl No.</th>
                <th className="py-3 px-4">Category Name</th>
                <th className="py-3 px-4">Product Id</th>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {prod.map((p, index) => (
                <tr key={p.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{catName}</td>
                  <td className="py-2 px-4">{p.id}</td>
                  {/* UpdateProduct handles Product Name, Price, Stock, Actions in separate <td>s */}
                  <UpdateProduct
                    access={access}
                    p={p}
                    form={form}
                    setProd={setProd}
                    setProdId={setProdId}
                    setForm={setForm}
                    prodId={prodId}
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

export default Products;
