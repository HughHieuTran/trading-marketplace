import React from 'react';
import { Link } from 'react-router-dom';
import notFound from '../assets/images/not-found.svg';

const Error = () => {
  return (
    <div className="full-page flex flex-col mt-10 items-center">
      <img className="h-[50vh]" src={notFound} alt="errorPage" />
      <h1>Page not Found</h1>
      <Link className="underline text-bold text-3xl text-blue-500" to="/">
        Back Home
      </Link>
    </div>
  );
};

export default Error;
