import React, { useState } from 'react';
import BarChart from './BarChart';
import AreaChart from './AreaChart';
import { useSelector } from 'react-redux';

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyProducts } = useSelector((state) => state.stat);

  return (
    <div className="bg-white w-full mt-10 rounded-md">
      <h2 className="text-center pt-10">Monthly Application</h2>
      <h4
        className="pl-10 text-primary-900 cursor-pointer  "
        onClick={() => setBarChart(!barChart)}
      >
        Switch to{' '}
        <span className="btn text-primary-500">
          {barChart ? 'Area Chart' : 'Bar Chart'}
        </span>
      </h4>
      {barChart && <BarChart data={monthlyProducts} />}
      {!barChart && <AreaChart data={monthlyProducts} />}
    </div>
  );
};

export default ChartsContainer;
