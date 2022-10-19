import logo from '../assets/images/logo.png';

import React from 'react';

const Logo = (props) => {
  return (
    <div>
      <img src={logo} alt="my company" className={`${props.className} w-20`} />
    </div>
  );
};

export default Logo;
