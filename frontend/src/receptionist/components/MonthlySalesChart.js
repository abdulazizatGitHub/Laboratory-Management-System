import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const  MonthlySalesChart = ({ data }) => {
  return (
    <div style={{width:"100%", overflowX:"auto"}}>
    <LineChart
      width={400}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 10,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="dateOfMonth" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="sales" stroke="#22CAB8" activeDot={{ r: 8 }} />
    </LineChart>
    </div>
  );
};

export default MonthlySalesChart;