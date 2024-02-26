import React from "react";
import { useLocation } from "react-router-dom";
import DailySalesChart from "../components/DailySaleschart";
import MonthlySalesChart from "../components/Detailstaffmonthly";

const DetailStaff = () => {
    const location = useLocation();
    const { data } = location.state;

    // Dummy data for demonstration
    const dailySalesData = [
        { date: 'Monday', sales: 200, tokens: 20 },
        { date: 'Tuesday', sales: 250, tokens: 25 },
        { date: 'Wednesday', sales: 300, tokens: 30 },
        { date: 'Thursday', sales: 350, tokens: 35 },
        { date: 'Friday', sales: 320, tokens: 32 },
        { date: 'Saturday', sales: 280, tokens: 28 },
        { date: 'Sunday', sales: 400, tokens: 40 }
    ];

    // Dummy data for demonstration
    const monthlySalesData = [
        { month: 'January', sales: 1000 },
        { month: 'February', sales: 1500 },
        { month: 'March', sales: 2000 },
        { month: 'April', sales: 2500 },
        { month: 'May', sales: 1800 },
        { month: 'June', sales: 2200 }
    ];

    return (
        <div>
            <h2>{data.name} Details</h2>
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Address:</strong> {data.address}</p>
            <p><strong>CNIC:</strong> {data.cnic}</p>
            <p><strong>Today's Sale:</strong> {data.todaySale}</p>
            <p><strong>Status:</strong> {data.status}</p>
            <p><strong>Shift:</strong> {data.shift}</p>

            {/* Daily Sales Chart */}
            <div>
                <h3>Daily Sales</h3>
                <DailySalesChart data={dailySalesData} />
            </div>

            {/* Monthly Sales Chart */}
            <div>
                <h3>Monthly Sales</h3>
                <MonthlySalesChart data={monthlySalesData} />
            </div>
        </div>
    );
};

export default DetailStaff;
