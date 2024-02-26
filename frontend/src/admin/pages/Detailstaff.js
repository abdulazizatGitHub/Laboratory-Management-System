import React from "react";
import { useLocation } from "react-router-dom";
import DailySalesChart from "../components/DailySaleschart";
import MonthlySalesChart from "../components/Detailstaffmonthly";
import '../css/StaffReportDetails.css';
import { useEffect } from "react";
import { getGeneratedToken } from "../../Services/API";
import { useState } from "react";
const DetailStaff = () => {
    const location = useLocation();
    const { data } = location.state;
    const[token,setToken] = useState([]);
    const[daily,setDaily] = useState([]);

    useEffect(()=>{
        console.log("data is ", data);
        getGenerateTokenData();
    },[]);

    const getGenerateTokenData=async()=>{
        const data = await getGeneratedToken(); 
        setToken(data);
        getDailyData();
    }

    const getDailyData=()=>{
        console.log("Token is ", token, " and cnic ", data.userName)
        const dateTimeString = token[0].dateTime;
        const dateTime = new Date(dateTimeString);
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dayOfWeekIndex = dateTime.getDay();
const dayOfWeek = daysOfWeek[dayOfWeekIndex];
    }

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
        <div className="staff-report-detail-container">
            <div className="sr-details-main">
                <h2>{data.name} Reports</h2>
                <div className="staff-details">
                    <p><strong>Name:</strong> {data.name}</p>
                    <p><strong>Contact #:</strong> {data.contactNumber}</p>
                    <p><strong>Role:</strong> {data.role}</p>
                    <p><strong>Status:</strong> {data.status}</p>
                    <p><strong>Shift:</strong> {data.shift}</p>
                </div>
            </div>

            <div className="sr-daily-details-container">
                <h2>Daily Reports</h2>
                <div className="sr-daily-details-main">
                    <div className="sr-daily-details">
                        <div className="sr-daily-content">
                            <p>Total Number of Tokens</p>
                            <p>20</p>
                        </div>
                        <div className="sr-daily-content">
                            <p>Total amount</p>
                            <p>2000</p>
                        </div>
                    </div>
                    {/* Daily Sales Chart */}
                    <div className="sr-daily-detail-graph">
                        <DailySalesChart data={dailySalesData} />
                    </div>
                </div>
            </div>

            <div className="sr-daily-details-container">
                <h2>Monthly Reports</h2>
                <div className="sr-daily-details-main">
                    <div className="sr-daily-details">
                        <div className="sr-daily-content">
                            <p>Total Number of Tokens</p>
                            <p>20</p>
                        </div>
                        <div className="sr-daily-content">
                            <p>Total amount</p>
                            <p>2000</p>
                        </div>
                    </div>
                    {/* Monthly Sales Chart */}
                    <div className="sr-daily-detail-graph">
                    <MonthlySalesChart data={monthlySalesData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailStaff;
