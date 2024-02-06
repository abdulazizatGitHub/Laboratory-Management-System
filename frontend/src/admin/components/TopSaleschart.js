import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

const TopSalesDoughnutChart = ({ data }) => {
  // Define colors for each product
  const colors = ['#00ADB5', '#D1495B', '#6A0572', '#F77F00', '#161528'];

  return (
    <PieChart width={400} height={300}>
      <Pie
        dataKey="sales"
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        label
        nameKey="product"
      >
        {/* Create custom legend and set colors for each product */}
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip />
      {/* Custom legend */}
      <Legend 
        formatter={(value, entry) => <span style={{ color: colors[entry.dataIndex % colors.length] }}>{value}</span>} // Set color of legend text
      />
    </PieChart>
  );
};

export default TopSalesDoughnutChart;
