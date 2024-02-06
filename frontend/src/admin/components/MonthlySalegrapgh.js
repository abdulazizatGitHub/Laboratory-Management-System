// MonthlySalesChart.js
import React from 'react';
import Chart from 'chart.js/auto';

const MonthlySalesChart = ({ data }) => {
  // Extracting labels and sales data from the provided data
  const labels = data.map(item => item.dateOfMonth);
  const salesData = data.map(item => item.sales);

  // Creating the chart once the component mounts
  React.useEffect(() => {
    const ctx = document.getElementById('monthlySalesChart');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Monthly Sales',
          data: salesData,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }, [data]);

  return <canvas id="monthlySalesChart" width="400" height="200"></canvas>;
};

export default MonthlySalesChart;
