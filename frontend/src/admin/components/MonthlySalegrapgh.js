import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MonthlySalesChart = ({ monthly }) => {
    const chartRef = useRef(null);

    useEffect(() => {
      if (chartRef.current) {
          // If a chart instance already exists, destroy it before creating a new one
          chartRef.current.destroy();
      }
   
      console.log("the monthly data", monthly);
    
  
      const ctx = document.getElementById('monthlySalesChart');
      const newChartInstance = new Chart(ctx, {
          type: 'line',
          data: {
              labels: monthly.map(item => item.dateOfMonth),
              datasets: [{
                  label: 'Monthly Sales',
                  data: monthly.map(item => item.sales),
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
  }, [monthly]);

    return <canvas id="monthlySalesChart" width="400" height="200"></canvas>;
};

export default MonthlySalesChart;
