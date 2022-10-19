import React from 'react';
import { Logo } from '../component';
import main from '../assets/images/landing-image.svg';
import { Link } from 'react-router-dom';
import { HiOutlineSearchCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';

const Landing = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <main>
      <nav className="w-[90vw] md:mt-10 max-w-6xl m-auto flex items-center  ">
        <Logo />
        <h2 className="font-bold p-10 text-4xl md:text-6xl">The Market</h2>
      </nav>
      <div className="w-[90vw] max-w-6xl m-auto min-h-[80vh] grid items-center mt-[-1rem] md:grid-cols-2 gap-12">
        <div className="info">
          <h1 className="font-bold">
            Free <span className="text-primary-500">Marketplace</span> trading
          </h1>
          <p className="text-gray-600">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature
          </p>
          <div className="flex justify-between">
            {!user && (
              <Link to="/register" className="btn btn-hero">
                Login / Register
              </Link>
            )}
            <Link to="/PublicShop" className="btn btn-hero ml-5 ">
              Browse shop
              <span className="inline-block px-2">
                <HiOutlineSearchCircle />
              </span>
            </Link>
          </div>
        </div>
        <img src={main} alt="company" className=" hidden md:block " />
      </div>
    </main>
  );
};

export default Landing;
