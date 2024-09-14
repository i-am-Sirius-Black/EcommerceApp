import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/products/search"
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  async function handleUpdateCart(id) {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No auth token found');
      return;
    }
  
    try {
      const response = await axios.post(
        'http://localhost:3000/api/cart',
        { productId: id },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
  
      console.log(response.data);
      alert("Added to cart");
      navigate('/cart') 
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  }
  

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Oops!</h2>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-600">No products to show.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg p-8">

              <h3 className="text-xl font-bold text-gray-900 mt-4">{product.name}</h3>
              <p className="text-gray-500 text-sm mt-2">{product.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-gray-900 font-bold text-lg">${product.price}</span>
                <button className="bg-gray-700 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-400" onClick={()=>handleUpdateCart(product.id)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
