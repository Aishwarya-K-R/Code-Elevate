import React, {useState} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function Layout() {
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const [displayRole, setDisplayRole] = useState(role === 'ADMIN' ? 'Admin' : 'User');  
  const goProfile = () => navigate('profile'); 

  const dashboard = () => {
    if(role === 'ADMIN'){
      navigate("/admin")
    }
    else{
      navigate("/user")
    }
  }

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="bg-white shadow-md flex justify-between items-center px-6 py-4">
        <button 
          onClick={() => navigate('/chatbot')} 
          className="px-4 py-2 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition"
        >
          Chat Assistant
        </button>

        <div className="flex items-center space-x-4">
          <span className="font-medium text-gray-700">Hi {displayRole}</span>
          <button className="px-4 py-2 bg-violet-500 text-white rounded-xl shadow hover:bg-violet-600 transition"
            onClick={dashboard}
          >
            Dashboard
          </button>
          <button 
            onClick={goProfile} 
            className="px-4 py-2 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition"
          >
            Profile
          </button>
          <button 
            onClick={logout} 
            className="px-4 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="flex-grow p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
