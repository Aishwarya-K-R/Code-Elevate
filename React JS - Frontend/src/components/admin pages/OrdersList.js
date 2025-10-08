import React, { useEffect, useState } from 'react';
import API from '../api_config/api';

function OrdersList() {
  const [olist, setOList] = useState([]);

  useEffect(() => {
    const ordersList = async () => {
      try {
        const result = await API.get('/admin/orders');
        setOList(result.data);
      } catch (err) {
        alert(err.response?.data || "Something went wrong");
      }
    };
    ordersList();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <h1 className="text-3xl font-bold text-center mb-6">Orders List</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white text-left">
            <tr>
              <th className="py-3 px-4">Sl No.</th>
              <th className="py-3 px-4">User Id</th>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Items</th>
            </tr>
          </thead>
          <tbody>
            {olist.map((order, index) => (
              <tr key={order.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{order.user.id}</td>
                <td className="py-2 px-4">{order.id}</td>
                <td className="py-2 px-4">{order.amt}</td>
                <td className="py-2 px-4">{order.status}</td>
                <td className="py-2 px-4">
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-gray-50 border border-gray-200 rounded-md">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="py-2 px-3">Product ID</th>
                          <th className="py-2 px-3">Quantity</th>
                          <th className="py-2 px-3">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.oitems.map((item) => (
                          <tr key={item.id} className="text-center">
                            <td className="py-1 px-2">{item.productId}</td>
                            <td className="py-1 px-2">{item.quantity}</td>
                            <td className="py-1 px-2">{item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersList;
