import React from "react";
import { Link } from "react-router-dom";

const HomePage = ({ userName }) => {
  
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-200">
        <div className="container">
          <div className="bg-white rounded-lg shadow-lg p-5 md:p-20 mx-2">
            <div className="text-center">
              <Link to="/products">
                <button className="md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-2 border-red-300 hover:border-red-400 hover:bg-red-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                  View Products
                </button>
              </Link>
              <h3 className="text-xl md:text-3xl mt-10 uppercase">
                Hello {userName}
              </h3>
              <p className="text-md md:text-xl mt-10">
                At EcommerceShop, we bring you the best deals on top-quality
                products across various categories. Whether you’re looking for
                the latest tech gadgets, fashion trends, or everyday essentials,
                we’ve got you covered. Enjoy a seamless shopping experience,
                exclusive discounts, and fast delivery. Happy shopping!
              </p>
            </div>
            <div className="flex flex-wrap mt-10 justify-center">
              {!userName && (
                <>
                  <div className="m-3">
                    <Link to="/signup">
                      <button className="md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-2 border-green-500 hover:border-green-700 hover:bg-green-600 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                        Signup
                      </button>
                    </Link>
                  </div>
                  <div className="m-3">
                    <Link to="/login">
                      <button className="md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-2 border-blue-500 hover:border-blue-700 hover:bg-blue-600 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                        Login
                      </button>
                    </Link>
                  </div>
                </>
              )}

              <div className="m-3">
                <a
                  href="https://www.linkedin.com/in/javed-khan-514601171/"
                  title="Quicktoolz On Facebook"
                  className="md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-2 border-orange-500 hover:border-orange-500 hover:bg-orange-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                >
                  <span className="mx-auto">Connect</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
