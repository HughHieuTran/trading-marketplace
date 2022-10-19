import React from 'react';

const StatItem = (props) => {
  const { title, count, icon, bcg, color } = props;
  return (
    <div
      className={`bg-white px-5 pt-8 rounded-sm mt-4 inline-block shadow-sm  `}
      style={{ borderBottom: `5px solid ${color}` }}
    >
      <div className={`flex justify-between items-center w-full`}>
        <h1 style={{ color: color }}>{count}</h1>
        <span
          style={{ color: color, backgroundColor: bcg }}
          className={`text-3xl mb-5 p-5  rounded-lg`}
        >
          {icon}
        </span>
      </div>
      <p className={`text-xl capitalize `} style={{ color: color }}>
        {title}
      </p>
    </div>
  );
};

export default StatItem;
