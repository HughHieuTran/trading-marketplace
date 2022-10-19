import React from 'react';

import PublicProducts from './main/PublicProducts';
import { Navbar } from '../component';

const Shop = () => {
  return (
    <div>
      <Navbar />
      <div className="w-[80%] m-auto">
        <PublicProducts />;
      </div>
    </div>
  );
};

export default Shop;
