import React from 'react';
// import MonthlySalesChart from '../../receptionist/components/MonthlySalesChart';
import TopSalesChart from '../components/TopSaleschart'; 
import '../css/MonthlyReport.css'
import ComparisonGraph from '../components/Comparisongrapgh';
import MonthlySalesChart from '../components/MonthlySalegrapgh';

const MonthlyReport = () => {
  // Static data for monthly sales
  const monthlySalesData = [
    { dateOfMonth: '1', sales: 100 },
    { dateOfMonth: '2', sales: 150 },
    { dateOfMonth: '3', sales: 200 },
    { dateOfMonth: '4', sales: 180 },
    { dateOfMonth: '5', sales: 220 },
    { dateOfMonth: '6', sales: 250 }
  ];

  // Static data for top sales
  const topSalesData = [
    { product: 'Product A', sales: 100 },
    { product: 'Product B', sales: 90 },
    { product: 'Product C', sales: 85 },
    { product: 'Product D', sales: 80 },
    { product: 'Product E', sales: 75 }
  ];

    // Static data for previous month sales
    const previousMonthSalesData = [
        { dateOfMonth: '1', sales: 80 },
        { dateOfMonth: '2', sales: 120 },
        { dateOfMonth: '3', sales: 180 },
        { dateOfMonth: '4', sales: 160 },
        { dateOfMonth: '5', sales: 200 },
        { dateOfMonth: '6', sales: 220 }
      ];

  return (
    <div  className='Monthly-Report-main'>

        <div className='MonthlySales'>
            <div className='Left-Side-Monthly'>
               <h2 className='Monthly-h2'>Monthly Sales</h2>
            {/* <MonthlySalesChart data={monthlySalesData} /> */}
            <MonthlySalesChart data={monthlySalesData} />
            
            </div>

            <div className='Right-Side-Monthly'>
                <h2 className='Monthly-h2'>Comparision With Last Month</h2>
                <ComparisonGraph 
            currentMonthSalesData={monthlySalesData} 
            previousMonthSalesData={previousMonthSalesData} 
          />
            </div>
        </div>
 {/* =============================================================================== */}


<div className='Top-Sale'>
   <div className='Left-TopSales'>
    <h2 className='Monthly-h2' >Top Sales of the Month</h2>
   <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Sales</th>
          </tr>
        </thead>
        <tbody>
          {topSalesData.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.product}</td>
              <td>{item.sales}</td>
            </tr>
          ))}
        </tbody>
      </table> 
   </div>

    <div className='Right-Sales'>
    <TopSalesChart data={topSalesData} />
    </div>

</div>


      {/* <h2>Top Sales</h2>
      <div style={{ width: '50%', margin: '0 auto' }}>
        <TopSalesChart data={topSalesData} />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Sales</th>
          </tr>
        </thead>
        <tbody>
          {topSalesData.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.product}</td>
              <td>{item.sales}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default MonthlyReport;
