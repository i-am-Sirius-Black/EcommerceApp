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
      const username = fullEmail.split('@')[0];
      setUserName(username);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }, [token]); 
  

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage userName={userName}/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin" element={<AdminPage />} />
        
        {/* Protected Route for Admin Page (Sellers Only) */}
        {/* <Route
          path="/admin"
          element={
            token && userRole === "seller" ? (
              <AdminPage />
            ) : (
              <Navigate to="/" /> // Redirect non-sellers to home
            )
          }
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
