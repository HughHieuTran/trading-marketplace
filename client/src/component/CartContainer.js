import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdLocalShipping } from 'react-icons/md';
import { AiOutlineClear } from 'react-icons/ai';
import { postOrders } from '../store/orderSlice';
import CartItem from './CartItem';
import Loading from './Loading';
import {
  getCartItems,
  calculateTotal,
  openCartModal,
} from '../store/cartSlice';

const CartContainer = () => {
  const { cartItems, total, isLoading } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotal());

    // eslint-disable-next-line
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems());
    //eslint-disable-next-line
  }, [total]);

  if (isLoading) {
    return <Loading />;
  }
  if (total < 1) {
    return (
      <section className="w-full h-full flex flex-col items-center mt-10">
        <h1 className="text-primary-500">Your cart</h1>
        <h2 className="text-gray-600 mt-10">is currently empty</h2>
      </section>
    );
  }
  return (
    <section className="">
      <h1 className="text-primary-500 hidden md:block text-center mt-5 mb-0">
        Your cart
      </h1>
      <div className="pt-2">
        {cartItems.map((item) => {
          return (
            <CartItem
              key={item._id}
              {...item.productId}
              quantity={item.quantity}
            />
          );
        })}
      </div>
      <footer className="flex flex-col justify-center items-center">
        <hr />
        <div className="cart-total">
          <h4>
            total <span>{total} items</span>
          </h4>
        </div>
        <div>
          <button
            className="btn  "
            onClick={() => {
              dispatch(postOrders());
            }}
          >
            <MdLocalShipping className="inline-block" /> Order !{' '}
            <MdLocalShipping className="inline-block" />
          </button>
          <button
            className="btn ml-10 "
            onClick={() => {
              dispatch(openCartModal());
            }}
          >
            <AiOutlineClear className="inline-block" /> clear cart{' '}
            <AiOutlineClear className="inline-block" />
          </button>
        </div>
      </footer>
    </section>
  );
};

export default CartContainer;
