import React from 'react';
import Logo from '../Logo';
import { NavLink, Link } from 'react-router-dom';
import links from '../../utils/link';

const BigSideBar = () => {
  return (
    <div className="col-1 md:block hidden bg-white shadow-sm h-[100vh] w-full">
      <div className="h-full px-16 relative flex flex-col items-center">
        <Link to="/" className="h-24 mt-10 shadow-md">
          <Logo className="absolute left-0 right-0 mx-auto" />
        </Link>
        <div className="flex flex-col  ">
          {links.map((item) => {
            return (
              <NavLink
                style={({ isActive }) =>
                  isActive ? { color: '#2cb1bc' } : { color: 'black' }
                }
                className="text-gray-500  flex items-center py-4 my-4 capitalize md:text-lg    group"
                key={item.id}
                to={item.path}
              >
                <span className="mr-5 ml-[-20px] group-hover:text-primary-500 duration-200">
                  {item.icon}
                </span>

                <span className="group-hover:text-primary-400  duration-200">
                  {item.text}
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BigSideBar;
