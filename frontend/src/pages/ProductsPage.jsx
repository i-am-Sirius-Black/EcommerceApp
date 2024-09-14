import React from 'react';
import ProductList from '../components/ProductList';

const ProductsPage = ({apiUrl}) => {
  return (
    <>
      <ProductList apiUrl={apiUrl}/>
    </>
  );
};

export default ProductsPage;
