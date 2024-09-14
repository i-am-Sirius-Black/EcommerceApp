import React, { useEffect, useState } from 'react';
import Cart from '../components/Cart';
import axios from 'axios';

const CartPage = ({apiUrl}) => {
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false); // New state for order placed

  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchCart = async () => {
      try {
        
        if (!token) {
          console.error('No auth token found');
          return;
        }
        const response = await axios.get(`${apiUrl}/api/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(response.data);
        
      } catch (error) {
        setError(error.response ? error.response.data : error.message);  
        console.error('Error:', error.response ? error.response.data : error.message);  
      }
    };
    fetchCart();
  }, []);


  async function handleRemoveCart(id){
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No auth token found');
      return;
    }
    try {
      const response = await axios.delete(`${apiUrl}/api/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(cartItems.filter((item) => item.id!== id));
    } catch (error) {
      console.error('Error:', error.response? error.response.data : error.message);
    }  }

  
  return (
    <>
      <Cart cartItems={cartItems} handleRemoveCart={handleRemoveCart} apiUrl={apiUrl}/>
    </>
  );
};

export default CartPage;
