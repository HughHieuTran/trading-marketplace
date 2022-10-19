import React from 'react';
import { useDispatch } from 'react-redux';
import {
  IoChevronDownCircleSharp,
  IoChevronUpCircleSharp,
} from 'react-icons/io5';
import { addCartItem, removeCartItem } from '../store/cartSlice';

const CartItem = ({
  _id: prodId,
  imageUrl,
  productName,
  quantity,
  shopLocation,
}) => {
  const dispatch = useDispatch();
  return (
    <article className="grid items-center grid-cols-1 sm:grid-cols-3 gap-6 mx-6 my-0 mb-5 bg-white rounded-lg py-10">
      <img
        className="w-20 h-20 object-cover col-auto mx-auto"
        src={imageUrl}
        alt={productName}
      />
      <div className="col-span-1 flex flex-col justify-center items-center sm:items-start">
        <h4 className="mb-2 font-medium text-lg md:text-2xl">
          product name : {productName}
        </h4>
        <h4 className="mb-2 font-medium text-sm md:text-lg">
          location: {shopLocation}
        </h4>
      </div>
      <div className="col-auto flex flex-col justify-center items-center">
        <button
          className="btn"
          onClick={() => {
            dispatch(addCartItem(prodId));
          }}
        >
          <IoChevronUpCircleSharp />
        </button>
        <p className="my-1 pl-4 w-10 bg-primary-500 rounded-full">{quantity}</p>
        <button
          className="btn"
          onClick={() => {
            dispatch(removeCartItem(prodId));
          }}
        >
          <IoChevronDownCircleSharp />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
