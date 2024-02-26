// MonthlySalesChart.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MonthlySalesChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById('monthlySalesChart');
    const newChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(item => item.month),
        datasets: [
          {
            label: 'Monthly Sales',
            data: data.map(item => item.sales),
            borderColor: 'rgb(75, 192, 192)',
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

  return <canvas id="monthlySalesChart" width="400" height="200"></canvas>;
};

export default MonthlySalesChart;
