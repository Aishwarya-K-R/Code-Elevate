import React from 'react';
import { Link } from 'react-router-dom';

function UserDashboard() {
  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('/images/image2.png')" }}
    >
      <div className="flex flex-col items-center justify-center flex-grow text-center text-white bg-black/50 p-8">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
          "A pet is the only thing on earth that loves you more than you love yourself."
        </h1>
        <p className="text-2xl italic mb-8 drop-shadow-md">
          Celebrate the unconditional love of your furry friends 🐾
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/user/categories"
            className="px-6 py-3 bg-green-500 rounded-xl text-white font-semibold hover:bg-green-600 transition"
          >
            Categories Page
          </Link>
          <Link
            to="/user/orders"
            className="px-6 py-3 bg-purple-500 rounded-xl text-white font-semibold hover:bg-purple-600 transition"
          >
            Orders Page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
