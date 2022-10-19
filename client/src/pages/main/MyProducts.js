import React from 'react';
import { ProductsContainer, SearchContainer } from '../../component';

const MyProducts = () => {
  return (
    <>
      <SearchContainer />
      <ProductsContainer isAdmin={true} />
    </>
  );
};

export default MyProducts;
