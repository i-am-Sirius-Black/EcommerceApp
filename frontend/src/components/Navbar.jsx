import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [userRole, setUserRole] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(()=>{
    try {
      const decodedToken = jwtDecode(token); 
      setUserRole(decodedToken.role);
    } catch (error) {
      console.error("Error fetching user role from token:", error);
    }
  }, [token]); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  
  return (

    <header className="lg:px-16 px-4 bg-white flex flex-wrap items-center py-4 shadow-md">
      <div className="flex-1 flex justify-between items-center">
        <a href="/" className="text-xl">EcomShop</a>
      </div>

      <label htmlFor="menu-toggle" className="pointer-cursor md:hidden block">
        <svg className="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </label>
      <input className="hidden" type="checkbox" id="menu-toggle" />

      <div className="hidden md:flex md:items-center md:w-auto w-full" id="menu">
        <nav>
          <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
            <li><Link className="md:p-4 py-3 px-0 block" to="/">Home</Link></li>
            <li><Link className="md:p-4 py-3 px-0 block" to="/products">Products</Link></li>
            {userRole =="buyer" && <li><Link className="md:p-4 py-3 px-0 block" to="/cart">Cart</Link></li>}
            {userRole=="seller" && <li><Link className="md:p-4 py-3 px-0 block text-teal-500 hover:text-teal-600" to="/admin">ADMIN PANEL</Link></li>}
            {!token ? (
              <li><Link className="md:p-4 py-3 px-0 block md:mb-0 mb-2" to="/login">Login</Link></li>
            ) : (
              <li>
                <button
                  className="md:p-4 py-3 px-0 block font-bold text-red-600 hover:text-red-700"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
