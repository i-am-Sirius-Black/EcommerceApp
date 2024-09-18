import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import AdminPage from "./pages/AdminPage";
import {jwtDecode} from "jwt-decode";
const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");


  useEffect(() => {
    if (!token) {
      console.log("No token found");
      return; 
    }

    try {
      const decodedToken = jwtDecode(token); 
      setUserRole(decodedToken.role);
      const fullEmail = decodedToken.email;
      const userName = fullEmail.split('@')[0];
      setUserName(userName);
      console.log(userName);
      
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }, [token]); 

    // Function to update token state after login
    const handleSetToken = (newToken) => {
      setToken(newToken);
      localStorage.setItem("token", newToken);
    };
  

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage userName={userName}/>} />
        <Route path="/login" element={<LoginPage apiUrl={apiUrl} setToken={handleSetToken}/>} />
        <Route path="/signup" element={<Signup apiUrl={apiUrl}/>} />
        <Route path="/products" element={<ProductsPage apiUrl={apiUrl}/>} />
        <Route path="/cart" element={<CartPage apiUrl={apiUrl}/>} />
        <Route path="/admin" element={<AdminPage apiUrl={apiUrl}/>} />
      
      </Routes>
    </Router>
  );
}

export default App;
