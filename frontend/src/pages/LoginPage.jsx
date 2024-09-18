import React from 'react';
import Login from '../components/Login';

const LoginPage = ({apiUrl, setToken}) => {
  return (
    <>
      <Login apiUrl={apiUrl} setToken={setToken}/>
    </>
  );
};

export default LoginPage;
