import React from "react";
import {  AiOutlineMinus } from "react-icons/ai";


const Cart = ({ cartItems, handleRemoveCart }) => {

  const quantities = cartItems.reduce((acc, item) => {
    acc[item.id] = item.quantity;
    return acc;
  }, {});

  const total = cartItems.reduce((sum, item) => {
    return sum + item.Product.price * quantities[item.id];
  }, 0);

  return (

    <div className="p-4 max-w-xl mx-auto mt-16">
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-200">
        <h1 className="text-lg font-bold">Shopping Cart</h1>
        <span className="text-gray-600">({cartItems.length} items)</span>
      </div>
      <div className="p-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center mb-4">
        
            <div className="flex-1">
              <h2 className="text-lg font-bold">{item.Product.name}</h2>
              <span className="text-gray-600">${item.Product.price.toFixed(2)}</span>
            </div>
            <div className="flex items-center">
              <p className="font-bold">qty:{item.quantity}</p>
            </div>
            <p className="ml-4 text-gray-600">
            Total: ${(item.Product.price * quantities[item.id]).toFixed(2)}
            </p>
            <div className="quantity-btn">
            <button
              onClick={() => handleRemoveCart(item.id)}
              className="ml-4 text-gray-600 hover:text-red-500"
            >
              <AiOutlineMinus className="w-3 h-3 text-gray-900" />
              
            </button>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-3 bg-gray-200">
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">Total:</span>
          <span className="font-bold text-lg">${total.toFixed(2)}</span>
        </div>
        <button className="block w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" >
          Checkout
        </button>
      </div>
    </div>
  </div>
  );
};

export default Cart;
