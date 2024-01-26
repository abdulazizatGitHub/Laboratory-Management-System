import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const DailySalesChart = ({ data }) => {
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="timeOfDay" />
      <YAxis />
      <Tooltip />
      <Legend />
      <defs>
        <linearGradient id="salesGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#22CAB8" />
          <stop offset="100%" stopColor="#108A7D" />
        </linearGradient>
      </defs>
      <Bar dataKey="sales" fill="url(#salesGradient)" />
    </BarChart>
  );
};

export default DailySalesChart;
