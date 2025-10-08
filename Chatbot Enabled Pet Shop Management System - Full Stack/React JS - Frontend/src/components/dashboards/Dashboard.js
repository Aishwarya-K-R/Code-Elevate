import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/image1.png')" }}>
      
      <nav className="bg-black/60 p-4 flex justify-end space-x-6">
        <Link to="/" className="text-white hover:text-yellow-300">Home</Link>
        <Link to="/signup" className="text-white hover:text-yellow-300">Signup</Link>
        <Link to="/login" className="text-white hover:text-yellow-300">Login</Link>
      </nav>

      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] text-center text-white">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
          Welcome to Charlie Pet Palace
        </h1>
        <p className="text-2xl text-gray-800 italic drop-shadow-md">
          "Happiness is a warm puppy 🐶"
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
