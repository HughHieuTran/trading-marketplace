import React from 'react';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const AreaChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ right: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area
          dataKey="count"
          type="monotone"
          stroke="#2cb1bc"
          fill="#bef8fd"
          barSize={75}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
