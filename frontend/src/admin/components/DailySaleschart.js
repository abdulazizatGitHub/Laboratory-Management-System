// DailySalesChart.js
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
        labels: data.map(item => item.date),
        datasets: [
          {
            label: 'Daily Sales',
            data: data.map(item => item.sales),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          },
          {
            label: 'Daily Tokens',
            data: data.map(item => item.tokens),
            borderColor: 'rgb(255, 99, 132)',
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
