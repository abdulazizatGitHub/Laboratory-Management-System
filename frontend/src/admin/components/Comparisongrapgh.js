// ComparisonGraph.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ComparisonGraph = ({ currentMonthSalesData, previousMonthSalesData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const labels = currentMonthSalesData.map(item => item.dateOfMonth);
    const currentMonthSales = currentMonthSalesData.map(item => item.sales);
    const previousMonthSales = previousMonthSalesData.map(item => item.sales);

    // Destroy previous chart instance if it exists
    if (chartRef.current !== null && chartRef.current !== undefined) {
      chartRef.current.destroy();
    }

    // Create new chart instance
    const ctx = document.getElementById('comparisonChart');
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Current Month',
          data: currentMonthSales,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          label: 'Previous Month',
          data: previousMonthSales,
          borderColor: 'rgb(255, 99, 132)',
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
    
    // Cleanup function
    return () => {
      if (chartRef.current !== null && chartRef.current !== undefined) {
        chartRef.current.destroy();
      }
    };
  }, [currentMonthSalesData, previousMonthSalesData]);

  return <canvas id="comparisonChart" width="400" height="200"></canvas>;
};

export default ComparisonGraph;
