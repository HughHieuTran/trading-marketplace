import React from 'react';
import { Modal } from '../../component';
import { useSelector, useDispatch } from 'react-redux';
import { CartContainer } from '../../component';
import { closeCartModal, clearCart } from '../../store/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { showCartModal } = useSelector((state) => state.cart);
  return (
    <div>
      {showCartModal && (
        <Modal
          onConfirm={() => {
            dispatch(clearCart());
            dispatch(closeCartModal());
          }}
          onClear={() => dispatch(closeCartModal())}
          text="clear all products? "
        />
      )}
      <CartContainer />
    </div>
  );
};

export default Cart;
