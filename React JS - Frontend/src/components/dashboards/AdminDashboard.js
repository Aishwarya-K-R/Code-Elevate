import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('/images/image2.png')" }}
    >
      <div className="flex flex-col items-center justify-center flex-grow text-center text-white bg-black/50 p-8">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
          “Pets are not our whole life, but they make our lives whole.”
        </h1>
        <p className="text-2xl italic mb-8 drop-shadow-md">
          They leave paw prints on our hearts 🐾
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/admin/users"
            className="px-6 py-3 bg-blue-500 rounded-xl text-white font-semibold hover:bg-blue-600 transition"
          >
            Users Page
          </Link>
          <Link
            to="/admin/categories"
            className="px-6 py-3 bg-green-500 rounded-xl text-white font-semibold hover:bg-green-600 transition"
          >
            Categories Page
          </Link>
          <Link
            to="/admin/orders"
            className="px-6 py-3 bg-purple-500 rounded-xl text-white font-semibold hover:bg-purple-600 transition"
          >
            Orders Page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
