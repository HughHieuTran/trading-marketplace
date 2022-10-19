import React from 'react';
import StatItem from './StatItem';
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const StatsContainer = () => {
  const { stats } = useSelector((state) => state.stat);
  const defaultStats = [
    {
      title: 'available product',
      count: stats.available || 0,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg: '#fcef7c',
    },
    {
      title: 'ordering product',
      count: stats.ordering || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'sold product',
      count: stats.sold || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </div>
  );
};

export default StatsContainer;
