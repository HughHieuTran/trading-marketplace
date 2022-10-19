import React from 'react';
import { FaTimes } from 'react-icons/fa';
import Logo from '../Logo';
import links from '../../utils/link';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../../store/modalSlice';
const SmallSideBar = () => {
  const { showSidebar } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  return (
    <div className="absolute">
      {showSidebar && (
        <div
          className="fixed h-full w-full bg-black/20 z-40"
          onClick={() => dispatch(toggleSidebar())}
        ></div>
      )}
      <div className="fixed flex justify-center items-center h-[90vh] w-[85vw] bg-white/90  z-50 mx-auto left-0 right-0 top-10 shadow-2xl text-center">
        <div className="h-[90vh] w-[85vw] px-16 relative flex flex-col items-center py-10">
          <button
            className="absolute top-[10px] left-[10px] text-2xl text-red-500"
            onClick={() => dispatch(toggleSidebar())}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className="p-8 flex flex-col">
            {links.map((item) => {
              return (
                <NavLink
                  className={({ isActive }) =>
                    `${
                      isActive ? 'text-primary-500 font-bold' : 'text-gray-500 '
                    } flex items-center py-4 my-4 capitalize md:text-xl group`
                  }
                  onClick={() => dispatch(toggleSidebar())}
                  key={item.id}
                  to={item.path}
                >
                  <span className="group-hover:text-primary-500 duration-200">
                    {item.icon}
                  </span>

                  <span className="px-5 group-hover:text-primary-400  duration-200">
                    {item.text}
                  </span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallSideBar;
