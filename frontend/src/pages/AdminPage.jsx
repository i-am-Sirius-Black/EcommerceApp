import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const AdminPage = () => {
  const [userRole, setUserRole] = useState(null);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    discount: '',
  });
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (!token) {
      console.log("No token found");
      return; 
    }

    try {
      const decodedToken = jwtDecode(token); 
      setUserRole(decodedToken.role);
    } catch (error) {
      console.error("Error fetching user role from token:", error);
    }
  }, [token]); 


  useEffect(() => {
    if (userRole === 'seller') {
      fetchProducts();
    }
  }, [userRole]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/products/search');
      setProducts(response.data);
    } catch (error) {
      setError('Failed to fetch products');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/api/products',
        { ...formData, seller_id: 2 }, 
        {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        }
      );
      setProducts([...products, response.data]);
      setFormData({ name: '', category: '', description: '', price: '', discount: '' });
    } catch (error) {
      setError('Failed to add product');
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/products/${selectedProductId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        }
      );
      const updatedProducts = products.map((product) =>
        product.id === selectedProductId ? response.data : product
      );
      setProducts(updatedProducts);
      setFormData({ name: '', category: '', description: '', price: '', discount: '' });
      setSelectedProductId(null);
    } catch (error) {
      setError('Failed to update product');
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      setError('Failed to delete product');
    }
  };

  if (userRole === null) return <div>Loading...</div>;

  if (userRole !== 'seller') {
    return <div className="text-red-500 text-lg font-semibold">You do not have permission to access this page.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Panel for Products</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Products</h2>
        {products.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <ul className="space-y-4">
            {products.map((product) => (
              <li key={product.id} className="bg-white shadow p-4 rounded-lg flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold text-gray-800">{product.name}</p>
                  <p className="text-gray-600">{product.category} - ${product.price}</p>
                </div>
                <div className="space-x-4">
                  <button
                    onClick={() => {
                      setSelectedProductId(product.id);
                      setFormData({
                        name: product.name,
                        category: product.category,
                        description: product.description,
                        price: product.price,
                        discount: product.discount,
                      });
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <form
        onSubmit={selectedProductId ? handleUpdateProduct : handleAddProduct}
        className="bg-white shadow-lg rounded-lg p-6"
      >
        <h2 className="text-xl font-semibold mb-4">{selectedProductId ? 'Update Product' : 'Add Product'}</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Discount:</label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          {selectedProductId ? 'Update Product' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
