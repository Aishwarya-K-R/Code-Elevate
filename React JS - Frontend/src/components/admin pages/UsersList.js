import React, { useEffect, useState } from 'react';
import API from '../api_config/api';

function UsersList() {
  const [ulist, setUList] = useState([]);

  useEffect(() => {
    const usersList = async () => {
      try {
        const result = await API.get('/admin/users');
        setUList(result.data);
      } 
      catch (err) {
        alert(err.response?.data || "Something went wrong");
      }
    };
    usersList();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Users List</h1>

      <div className="overflow-x-auto mx-5 md:mx-20">
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white text-left">
            <tr>
              <th className="py-3 px-4">Sl No.</th>
              <th className="py-3 px-4">User Id</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
            </tr>
          </thead>
          <tbody>
            {ulist.map((user, index) => (
              <tr key={user.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{user.id}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersList;
