import React, { useState } from 'react';
import API from '../api_config/api';
import DeleteProduct from './DeleteProduct';
import { useNavigate } from 'react-router-dom';

function UpdateProduct({ access, p, form, setProd, setProdId, prodId, setForm }) {
  const navigate = useNavigate();
  const [showQuantity, setShowQuantity] = useState(false);
  const [quantityForm, setQuantityForm] = useState({ quantity: "" });
  const [cartProdId, setCartProdId] = useState(null);

  const changeHandler = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const saveHandler = async (id) => {
    try {
      const result = await API.put(`/admin/update/product/${id}`, { ...form });
      setProd(prev => prev.map(p => (p.id === id ? result.data : p)));
      setProdId(null);
      alert("Product updated successfully!");
    } 
    catch (err) {
      alert(err.response?.data || "Update failed");
    }
  };

  const editHandler = (p) => {
    setProdId(p.id);
    setForm({ name: p.name, price: p.price, stock: p.stock });
  };

  const viewProductHandler = (id) => {
    navigate(access ? `/admin/products/view/${id}` : `/user/products/view/${id}`);
  };

  const addToCartHandler = (pid) => {
    setCartProdId(pid);
    setShowQuantity(true);
  };

  const quantityChangeHandler = (e) => setQuantityForm({ ...quantityForm, [e.target.name]: e.target.value });

  const saveCartHandler = async (id) => {
    try {
      await API.post(
        `/user/${localStorage.getItem('id')}/add/cart/${id}`,
        quantityForm.quantity,
        { headers: { "Content-Type": "application/json" } }
      );
      setShowQuantity(false);
      setQuantityForm({ quantity: "" });
      alert("Product successfully added to cart!");
    } 
    catch (err) {
      alert(err.response?.data);
    }
  };

  const cancelCartHandler = () => {
    setShowQuantity(false);
    setQuantityForm({ quantity: "" });
    setCartProdId(null);
  };

  return (
    <>
      <td className="py-2 px-4">{prodId === p.id ? (
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={changeHandler}
          className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      ) : (
        p.name
      )}</td>

      <td className="py-2 px-4">{prodId === p.id ? (
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={changeHandler}
          className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      ) : (
        p.price
      )}</td>

      <td className="py-2 px-4">{prodId === p.id ? (
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={changeHandler}
          className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      ) : (
        p.stock
      )}</td>

      <td className="py-2 px-4 flex flex-col gap-2">
        {prodId === p.id ? (
          <div className="flex gap-2">
            <button
              onClick={() => saveHandler(p.id)}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Save
            </button>
            <button
              onClick={() => setProdId(null)}
              className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        ) : cartProdId === p.id && showQuantity ? (
          <div className="flex gap-2">
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={quantityForm.quantity}
              onChange={quantityChangeHandler}
              className="border border-gray-300 rounded px-2 py-1 w-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={() => saveCartHandler(p.id)}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Save
            </button>
            <button
              onClick={cancelCartHandler}
              className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => viewProductHandler(p.id)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              View
            </button>
            {!access && (
              <button
                onClick={() => addToCartHandler(p.id)}
                className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
              >
                Add To Cart
              </button>
            )}
            {access && (
              <>
                <button
                  onClick={() => editHandler(p)}
                  className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
                >
                  Edit
                </button>
                <DeleteProduct setProd={setProd} p={p} />
              </>
            )}
          </div>
        )}
      </td>
    </>
  );
}

export default UpdateProduct;
