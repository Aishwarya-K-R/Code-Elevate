import React, { useEffect, useState } from 'react';
import API from '../api_config/api';
import { useNavigate, useParams } from 'react-router-dom';

function ConfirmOrders() {
  const { oid } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await API.get(`/user/orders/${localStorage.getItem('id')}`);
        setOrder(result.data.find(o => o.id == Number(oid)));
      } catch (err) {
        alert(err.response?.data || "Something went wrong");
      }
    };
    fetchOrders();
  }, [oid]);

  const confirmOrderHandler = async (id) => {
    try {
      const result = await API.get(`/confirm/order/${id}`);
      setOrder(result.data);
      alert("Order confirmed successfully!");
    } catch (err) {
      alert(err.response?.data);
    }
  };

  const cancelOrderHandler = async (id) => {
    try {
      const result = await API.get(`/cancel/order/${id}`);
      setOrder(result.data);
      alert("Order cancelled successfully!");
    } catch (err) {
      alert(err.response?.data);
    }
  };

  if (!order) {
    return <h1 className="text-center text-2xl font-bold mt-20">No Orders Found !!!</h1>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
  <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold">Order Confirmation</h1>
      
      <div className="flex gap-4">
        {(order.status === 'PENDING') && (
          <>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              onClick={() => confirmOrderHandler(oid)}
            >
              Confirm Order
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              onClick={() => cancelOrderHandler(oid)}
            >
              Cancel Order
            </button>
          </>
        )}
        
        {(order.status === 'CANCELLED' || order.status === 'CONFIRMED') && (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={() => navigate('/user/orders')}
          >
            Back to Orders
          </button>
        )}
      </div>
    </div>



        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">Order ID</th>
              <th className="py-2 px-4 border">Amount</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Items</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border">{order.id}</td>
              <td className="py-2 px-4 border">{order.amt}</td>
              <td className="py-2 px-4 border">{order.status}</td>
              <td className="py-2 px-4 border">
                <table className="min-w-full border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-1 px-2 border">Product ID</th>
                      <th className="py-1 px-2 border">Quantity</th>
                      <th className="py-1 px-2 border">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.oitems.map((item) => (
                      <tr key={item.id} className="text-center">
                        <td className="py-1 px-2 border">{item.productId}</td>
                        <td className="py-1 px-2 border">{item.quantity}</td>
                        <td className="py-1 px-2 border">{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ConfirmOrders;
