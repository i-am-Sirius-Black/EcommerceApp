// import React from "react";
// import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

// const Counter = ({ quantity, onQuantityChange }) => {
//   return (
//     <div className="flex items-center">
//       {/* Decrement Button */}
//       <button
//         type="button"
//         onClick={() => onQuantityChange(quantity - 1)} 
//         className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
//       >
//         <AiOutlineMinus className="w-3 h-3 text-gray-900 dark:text-white" />
//       </button>

//       {/* Display Quantity */}
//       <input
//         type="text"
//         value={quantity}
//         readOnly
//         className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//       />

//       {/* Increment Button */}
//       <button
//         type="button"
//         onClick={() => onQuantityChange(quantity + 1)}  
//         className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
//       >
//         <AiOutlinePlus className="w-3 h-3 text-gray-900 dark:text-white" />
//       </button>
//     </div>

//   );
// };

// export default Counter;