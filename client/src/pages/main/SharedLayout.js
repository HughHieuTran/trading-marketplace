import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, BigSideBar, SmallSidebar } from '../../component';
import { useSelector } from 'react-redux';

const SharedLayout = () => {
  const { showSidebar } = useSelector((state) => state.modal);
  return (
    <div>
      <main className="grid grid-cols-1 md:grid-cols-6">
        {showSidebar && <SmallSidebar />}
        <BigSideBar />
        <div className="col-span-5">
          <Navbar />
          <div className="w-[95%] m-auto  ">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SharedLayout;
