import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DailySalesChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById('dailySalesChart');
    const newChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [], // Empty labels array to remove the days
        datasets: [
          {
            label: 'Total Sales',
            data: [data.reduce((acc, curr) => acc + curr.sales, 0)], // Sum of all sales
            borderColor: 'rgb(255, 99, 132)', // Red color
            tension: 0.1
          },
          {
            label: 'Total Tokens',
            data: [data.reduce((acc, curr) => acc + curr.tokens, 0)], // Sum of all tokens
            borderColor: 'rgb(75, 192, 192)', // Green color
            tension: 0.1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    chartRef.current = newChartInstance;

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);

  return <canvas id="dailySalesChart" width="400" height="200"></canvas>;
};

export default DailySalesChart;
