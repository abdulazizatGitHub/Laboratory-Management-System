import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MonthlySalesChart = ({ monthlyData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!monthlyData || !monthlyData.length) {
      return; // Return early if monthlyData is undefined or empty
    }

    if (chartRef.current) {
      // If a chart instance already exists, destroy it before creating a new one
      chartRef.current.destroy();
    }

    const ctx = document.getElementById('monthlySalesChart');
    const labels = monthlyData.map(item => item.dateTime); // Assuming dateTime is the label
    const data = monthlyData.map(item => item.grandTotal); // Assuming grandTotal represents sales
    const newChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Monthly Sales',
          data: data,
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

    // Save the reference to the chart instance
    chartRef.current = newChartInstance;

    // Cleanup function to destroy the chart instance when component unmounts
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [monthlyData]);

  return <canvas id="monthlySalesChart" width="400" height="200"></canvas>;
};

export default MonthlySalesChart;
