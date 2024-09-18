import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({apiUrl, setToken}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/login`,
        { email, password }
      );

      if (response.data && response.data.token) {
        alert("Login successful!");
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        navigate('/')
      } else {
        alert("Login failed: No token received");
        console.error("Login failed: No token received");
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response) {
        // Log error response data for debugging
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
      alert("Login failed!");
    }
  };

  return (
    <div className="relative mx-auto my-20 w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
      <div className="w-full">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-900">Sign in</h1>
          <p className="mt-2 text-gray-500">Sign in below to access your account</p>
        </div>
        <div className="mt-5">
          <form action="">
            <div className="relative mt-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                name="email"
                id="email"
                className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                autoComplete="NA"
              />
              <label
                htmlFor="email"
                className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
              >
                Email Address
              </label>
            </div>
            <div className="relative mt-6">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                name="password"
                id="password"
                className="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
              />
              <label
                htmlFor="password"
                className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
              >
                Password
              </label>
            </div>
            <div className="my-6">
              <button
                type="submit"
                className="w-full rounded-md bg-blue-400 px-3 py-4 text-white shadow hover:bg-blue-500 hover:shadow-sm focus:bg-blue-600 focus:outline-none"
                onClick={handleLogin}
              >
                Sign in
              </button>
            </div>
            <p className="text-center text-sm text-gray-500">
              Don&#x27;t have an account yet?
              <a
                href="/signup"
                className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
              >
                Sign up
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
