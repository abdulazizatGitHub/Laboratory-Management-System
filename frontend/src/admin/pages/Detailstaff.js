import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DailySalesChart from "../components/DailySaleschart";
import MonthlySalesChart from "../components/Detailstaffmonthly";
import '../css/StaffReportDetails.css';
import { getGeneratedToken } from "../../Services/API";

const DetailStaff = () => {
    const location = useLocation();
    const { data } = location.state;
    const [token, setToken] = useState([]);
    const [daily, setDaily] = useState({ labels: [], salesData: [], tokenData: [] });
    const [monthly, setMonthly] = useState([]);

    useEffect(() => {
        getGenerateTokenData();
    }, []);

    useEffect(() => {
        getMonthlyData();
        getDailyData();
    }, [token]);

    const getGenerateTokenData = async () => {
        try {
            const tokenData = await getGeneratedToken();
            const filteredTokenData = tokenData.filter(d => d.generatedBy === data.userName);
            setToken(filteredTokenData);
        } catch (error) {
            console.error("Error fetching token data:", error);
        }
    }

    const getDailyData = () => {
        const dailyData = token.filter(tkn => {
            let dateStr = tkn.dateTime;
            let dateObj = new Date(dateStr);
            let mnthNum = dateObj.getMonth() + 1;
            let dayNum = dateObj.getDate();
            return mnthNum === new Date().getMonth() + 1 && dayNum === new Date().getDate();
        });

        const labels = dailyData.map(item => item.dateTime);
        const salesData = dailyData.map(item => item.grandTotal);
        const tokenData = dailyData.map(item => item.numOfToken);

        setDaily({
            labels: labels,
            salesData: salesData,
            tokenData: tokenData
        });
    }

    const getMonthlyData = () => {
        const monthlyData = token.filter(tkn => {
            let dateStr = tkn.dateTime;
            let dateObj = new Date(dateStr);
            let mnthNum = dateObj.getMonth() + 1;
            return mnthNum === new Date().getMonth() + 1;
        });
    
        const monthlyChartData = monthlyData.map(item => ({
            dateOfMonth: item.dateTime,
            sales: Number(item.grandTotal) // Use grandTotal as sales
        }));
    
        setMonthly(monthlyChartData);
        
        // Calculate total amount
        const totalAmount = monthlyChartData.reduce((acc, curr) => acc + (curr.sales || 0), 0);
        console.log('Total amount:', totalAmount);
    }
    

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
                            <p>{daily.tokenData.length}</p>
                        </div>
                        <div className="sr-daily-content">
                            <p>Total amount</p>
                            <p>{daily.salesData.reduce((acc, curr) => acc + curr, 0)}</p>
                        </div>
                    </div>
                    {/* Daily Sales Chart */}
                    <div className="sr-daily-detail-graph">
                        <DailySalesChart daily={daily} />
                    </div>
                </div>
            </div>

            <div className="sr-daily-details-container">
                <h2>Monthly Reports</h2>
                <div className="sr-daily-details-main">
                    <div className="sr-daily-details">
                        <div className="sr-daily-content">
                            <p>Total Number of Tokens</p>
                            <p>{monthly.length}</p>
                        </div>
                        <div className="sr-daily-content">
                            <p>Total amount</p>
                            <p>{monthly.reduce((acc, curr) => acc + curr.sales, 0)}</p>
                        </div>
                    </div>
                    
                    {/* Monthly Sales Chart */}
                    <div className="sr-daily-detail-graph">
                        <MonthlySalesChart data={monthly} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailStaff;
