import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setEditProduct, deleteProduct } from '../../store/modProductSlice';
import { addCartItem } from '../../store/cartSlice';

const Product = ({
  _id,
  brand,
  productName,
  status,
  condition,
  shopLocation,
  updatedAt,
  isAdmin,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = { _id, brand, productName, status, condition, shopLocation };
  const { user } = useSelector((state) => state.auth);
  const addToCartHandler = () => {
    if (!user) {
      return navigate('/register');
    }
    dispatch(addCartItem(_id));
  };
  return (
    <div className="bg-primary-200 rounded-md p-5">
      <div className="flex justify-between items-center">
        <h1 className="mb-2">{brand}</h1>{' '}
        <p className="mt-5 text-gray-500">
          Last update: {updatedAt.split('T')[0]}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2  ">
        <p className="m-0">productName: {productName}</p>
        <p className="m-0">status: {status}</p>
        <p className="m-0">condition: {condition}</p>
        <p className="m-0">Location: {shopLocation}</p>
        {isAdmin && (
          <div className="mt-5">
            <Link
              to="/add-product"
              onClick={() => {
                dispatch(setEditProduct(product));
              }}
              className="btn "
            >
              Edit
            </Link>
            <button
              className="btn ml-2"
              onClick={() => dispatch(deleteProduct(_id))}
            >
              Delete
            </button>
          </div>
        )}
        {!isAdmin && (
          <div className="mt-5 flex flex-col md:flex-row  justify-between min-w-max min-h-max ">
            <Link
              to={`/product/${_id}`}
              className="btn text-center mb-2 md:mb-0"
            >
              See details
            </Link>
            <button className="btn md:ml-5" onClick={addToCartHandler}>
              addToCart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
