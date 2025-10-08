import React, { useEffect, useState } from 'react';
import API from '../api_config/api';
import { useNavigate } from 'react-router-dom';

function ViewOrders() {

  const navigate = useNavigate();
  const [olist, setOList] = useState([]);

  useEffect(() => {
    const ordersList = async () => {
      try {
        const result = await API.get(`/user/orders/${localStorage.getItem('id')}`);
        setOList(result.data);
      } catch (err) {
        alert(err.response?.data);
      }
    };
    ordersList();
  }, []);

  if (olist.length === 0) {
    return <h1 className="text-center text-2xl mt-20">No Orders Found !!!</h1>;
  }

  return (
    <div className="p-5">
      <h1 className="text-center text-3xl font-bold mb-6">Orders List</h1>
      <table className="min-w-full border border-gray-300 mx-auto">
        <thead className="bg-gray-200">
          <tr className="text-left">
            <th className="py-2 px-4 border">Sl No.</th>
            <th className="py-2 px-4 border">Order ID</th>
            <th className="py-2 px-4 border">Amount</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Items</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {olist.map((order, index) => (
            <tr key={order.id} className="text-center">
              <td className="py-1 px-2 border">{index + 1}</td>
              <td className="py-1 px-2 border">{order.id}</td>
              <td className="py-1 px-2 border">{order.amt}</td>
              <td className="py-1 px-2 border">{order.status}</td>
              <td className="py-1 px-2 border">
                <table className="min-w-full border border-gray-200 mx-auto">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-1 px-2 border">Product ID</th>
                      <th className="py-1 px-2 border">Quantity</th>
                      <th className="py-1 px-2 border">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.oitems.map((item) => (
                      <tr key={item.id}>
                        <td className="py-1 px-2 border">{item.productId}</td>
                        <td className="py-1 px-2 border">{item.quantity}</td>
                        <td className="py-1 px-2 border">{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
              <td className="py-1 px-2 border">
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => navigate(`/user/confirm/order/${order.id}`)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewOrders;
