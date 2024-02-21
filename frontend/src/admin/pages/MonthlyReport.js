import React, { useEffect, useState } from 'react';
// import MonthlySalesChart from '../../receptionist/components/MonthlySalesChart';
import TopSalesChart from '../components/TopSaleschart'; 
import '../css/MonthlyReport.css'
import ComparisonGraph from '../components/Comparisongrapgh';
import MonthlySalesChart from '../components/MonthlySalegrapgh';
import { getGeneratedToken } from '../../Services/API';

const MonthlyReport = () => {
  // Static data for monthly sales
  const [monthlySalesData , setmonthlysalesdata] = useState([]);
  const [premonthData , setpremonthData] = useState([]);

   
  useEffect(()=>{
    fetchdata();
    fetchprevmonth();
  },[]);
  
  const fetchdata = async() =>
  {
    const salesdata = await getGeneratedToken();
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const monthData = salesdata.filter(item => {
            const itemDate = new Date(item.dateTime);
            return itemDate >= firstDayOfMonth && itemDate <= lastDayOfMonth;
        });
        console.log("Current Month's Sales Data is", monthData);
        setmonthlysalesdata(monthData);

   }

   const formattedMonthlySalesData = monthlySalesData.map(data => ({
    dateOfMonth: new Date(data.dateTime).getDate(),
    sales: data.grandTotal,
}));


const fetchprevmonth = async () =>{
  
    const salesData = await getGeneratedToken();
    const today = new Date();
    const firstDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    const previousMonthData = salesData.filter(item => {
      const itemDate = new Date(item.dateTime);
      return itemDate >= firstDayOfPreviousMonth && itemDate <= lastDayOfPreviousMonth;
    });
    console.log("Prev Month",previousMonthData);
    setpremonthData(previousMonthData);
}

const formattedprevmonth = premonthData.map(data => ({
  dateOfMonth: new Date(data.dateTime).getDate(),
  sales: data.grandTotal,
}));



  // Static data for top sales
  const topSalesData = [
    { product: 'Product A', sales: 100 },
    { product: 'Product B', sales: 90 },
    { product: 'Product C', sales: 85 },
    { product: 'Product D', sales: 80 },
    { product: 'Product E', sales: 75 }
  ];

 

  return (
    <div  className='Monthly-Report-main'>

        <div className='MonthlySales'>
            <div className='Left-Side-Monthly'>
               <h2 className='Monthly-h2'>Monthly Sales</h2>
            {/* <MonthlySalesChart data={monthlySalesData} /> */}
            <MonthlySalesChart data={formattedMonthlySalesData} />
            
            </div>

            <div className='Right-Side-Monthly'>
                <h2 className='Monthly-h2'>Comparision With Last Month</h2>
                <ComparisonGraph 
            currentMonthSalesData={formattedMonthlySalesData} 
            previousMonthSalesData={formattedprevmonth} 
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
