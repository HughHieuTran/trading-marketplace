import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Product from './Product';
import Loading from '../Loading';
import { getProducts } from '../../store/productSlice';

const ProductContainer = ({ isAdmin }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.modal);
  const {
    products,
    totalProducts,
    search,
    searchStatus,
    searchCondition,
    sort,
  } = useSelector((state) => state.getProduct);

  const inputSearch = { isAdmin, search, searchStatus, searchCondition, sort };

  useEffect(() => {
    dispatch(getProducts(inputSearch));

    //eslint-disable-next-line
  }, [search, searchStatus, searchCondition, sort]);

  if (isLoading) {
    return <Loading />;
  }
  if (products.length === 0) {
    return (
      <div className="text-center text-primary-500 m-auto p-8 bg-white rounded-md mt-5 md:mt-10 shadow-md">
        <h1 className="mt-5">No products to display</h1>
      </div>
    );
  }

  return (
    <div className="m-auto p-8 bg-white rounded-md mt-5 md:mt-10 shadow-md">
      <h5>
        {totalProducts} product{products.length > 1 && 's'} found
      </h5>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
        {products.map((product) => {
          return <Product key={product._id} {...product} isAdmin={isAdmin} />;
        })}
      </div>
    </div>
  );
};

export default ProductContainer;
