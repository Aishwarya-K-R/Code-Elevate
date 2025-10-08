import React, { useEffect, useState } from 'react';
import API from '../api_config/api';
import { useNavigate } from 'react-router-dom';

function ViewCart() {

    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [prodId, setProdId] = useState(null);
    const [quantityForm, setQuantityForm] = useState({ quantity: "" });
    const [empty, setEmpty] = useState(false);

    useEffect(() => {
        const viewcart = async () => {
            try {
                const uid = localStorage.getItem('id');
                const result = await API.get(`/user/${uid}/cart`);
                setCart(result.data.cartItems);
            }
            catch (err) {
                if (err.response?.data === 'Cart is empty !!!') {
                    setEmpty(true);
                }
                else {
                    alert(err.response?.data);
                }
            }
        };
        viewcart();
    }, []);

    const changeHandler = e => {
        setQuantityForm({ ...quantityForm, [e.target.name]: e.target.value });
    }

    const cancelHandler = (c) => {
        setProdId(null);
        setQuantityForm({ quantity: c.quantity });
    }

    const removeHandler = async (cid) => {
        try {
            const confirm = window.confirm("Are u sure u want to delete the selected item from the cart ?");
            if (confirm) {
                const message = await API.delete(`/user/${localStorage.getItem('id')}/delete/cart/${cid}`);
                const updatedCart = cart.filter(c => c.id !== cid);
                setCart(updatedCart);
                if (updatedCart.length === 0) {
                    setEmpty(true);
                }
                alert(message.data);
            }
        }
        catch (err) {
            alert(err.response?.data);
        }
    }

    const editHandler = async (c) => {
        setProdId(c.id);
        setQuantityForm({ quantity: c.quantity });
    }

    const saveCartHandler = async (cid) => {
        try {
            const result = await API.put(`/user/${localStorage.getItem('id')}/update/cart/${cid}`, quantityForm['quantity'], { headers: { "Content-Type": "application/json" } });
            setCart(cart.map(c => c.id === cid ? result.data : c));
            setProdId(null);
            setQuantityForm({ quantity: result.data.quantity });
            alert("Cart Item updated successfully !!");
        }
        catch (err) {
            alert(err.response?.data)
        }
    }

    const checkoutHandler = async () => {
        try {
            const orders = await API.get(`/user/${localStorage.getItem('id')}/cart/checkout`);
            alert("Cart checkout successful !!");
            navigate(`/user/confirm/order/${orders.data.id}`);
        }
        catch (err) {
            alert(err.response?.data)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-5">
            {empty ? (
                <h1 className="text-center text-2xl font-bold mt-20">Cart is Empty !!!</h1>
            ) : (
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">

                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold">Cart Page</h1>
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            onClick={checkoutHandler}
                        >
                            Cart Checkout
                        </button>
                    </div>

                    <table className="min-w-full border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-2 px-4 border">Sl No.</th>
                                <th className="py-2 px-4 border">Product Id</th>
                                <th className="py-2 px-4 border">Product Name</th>
                                <th className="py-2 px-4 border">Quantity</th>
                                <th className="py-2 px-4 border">Price</th>
                                <th className="py-2 px-4 border">Total Amount</th>
                                <th className="py-2 px-4 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((c, index) => (
                                <tr key={c.id} className="text-center">
                                    <td className="py-1 px-2 border">{index + 1}</td>
                                    <td className="py-1 px-2 border">{c.productId}</td>
                                    <td className="py-1 px-2 border">{c.productName}</td>
                                    <td className="py-1 px-2 border">{c.quantity}</td>
                                    <td className="py-1 px-2 border">{c.price}</td>
                                    <td className="py-1 px-2 border">{c.price * c.quantity}</td>
                                    <td className="py-1 px-2 border flex justify-center gap-2">
                                        {c.id === prodId ? (
                                            <>
                                                <input
                                                    type="number"
                                                    name="quantity"
                                                    value={quantityForm.quantity}
                                                    onChange={changeHandler}
                                                    className="border px-2 py-1 w-20"
                                                />
                                                <button
                                                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                                    onClick={() => saveCartHandler(c.id)}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    className="px-2 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                                                    onClick={() => cancelHandler(c)}
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                                                    onClick={() => editHandler(c)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                    onClick={() => removeHandler(c.id)}
                                                >
                                                    Remove
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default ViewCart