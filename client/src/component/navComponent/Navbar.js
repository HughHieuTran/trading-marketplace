import React, { useState, useEffect } from 'react';
import {
  FaAlignLeft,
  FaUserCircle,
  FaCaretDown,
  FaShoppingCart,
} from 'react-icons/fa';
import { TbArrowBack } from 'react-icons/tb';
import Logo from '../Logo';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../../store/modalSlice';
import { logoutUser } from '../../store/authSlice';
import Modal from '../Modal';
import { closeModal, openModal } from '../../store/modalSlice';
import { Link, useNavigate } from 'react-router-dom';
import { calculateTotal } from '../../store/cartSlice';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { isOpen } = useSelector((state) => state.modal);
  const { total, cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropDown] = useState(false);
  useEffect(() => {
    dispatch(calculateTotal());

    // eslint-disable-next-line
  }, [cartItems]);
  return (
    <div className="h-24 flex items-center justify-center shadow-sm bg-white">
      {isOpen && (
        <Modal
          onConfirm={() => {
            dispatch(logoutUser());
            dispatch(closeModal());
          }}
          onClear={() => {
            dispatch(closeModal());
          }}
          text="You sure you wanna logout?"
        />
      )}
      <div className="flex w-[90vw] justify-between items-center">
        <button
          className=" pl-10 bg-transparent text-3xl text-primary-500 cursor-pointer flex items-center"
          onClick={() => {
            if (!user) {
              navigate('/landing');
            }
            dispatch(toggleSidebar());
          }}
        >
          {user ? <FaAlignLeft /> : <TbArrowBack />}
        </button>
        <div>
          <Logo className="flex items-center w-[80px] md:hidden" />
          <h3 className="hidden md:block m-0">Trading Marketplace</h3>
        </div>
        <div className="relative md:mr-32 mr-10 flex ">
          <button
            type="button"
            className="text-white px-3 bg-primary-500 rounded-md py-2 flex justify-center items-center gap-x-2 relative shadow-md hover:bg-primary-700"
            onClick={() => setShowDropDown(!showDropdown)}
          >
            <FaUserCircle />
            {user ? user.name : 'User'}
            <FaCaretDown />
          </button>
          {!user && showDropdown && (
            <div>
              <Link
                to="/register"
                className=" hover:bg-primary-600 group absolute top-[40px] left-0 w-full bg-primary-100 shadow-md p-2 text-center rounded-t-md "
              >
                <div className="bg-transparent w-full text-primary-500 group-hover:text-white  tracking-wider cursor-pointer ">
                  Register / Login
                </div>
              </Link>{' '}
            </div>
          )}
          {user && showDropdown && (
            <div>
              <Link
                to="/"
                className=" hover:bg-primary-600 group absolute top-[40px] left-0 w-full bg-primary-100 shadow-md p-2 text-center rounded-t-md "
              >
                <div className="bg-transparent w-full text-primary-500 group-hover:text-white  tracking-wider cursor-pointer ">
                  Profile
                </div>
              </Link>
              <div className=" hover:bg-primary-600 group absolute top-[80px] left-0 w-full bg-primary-100 shadow-md p-2 text-center rounded-b-md ">
                <button
                  type="button"
                  className="bg-transparent w-full text-primary-500 group-hover:text-white  tracking-wider cursor-pointer "
                  onClick={() => {
                    dispatch(openModal());
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
          {user && (
            <Link
              to="/cart"
              className=" text-white px-3 bg-primary-500 rounded-md py-2  relative shadow-md hover:bg-primary-700 ml-2"
            >
              <FaShoppingCart />{' '}
              {total > 0 && (
                <p className="text-center absolute bottom-[0px] left-7 border border-purple-500 rounded-full px-2 py-1 bg-primary-500">
                  {total}
                </p>
              )}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
