import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DailySalesChart from "../components/DailySaleschart";
import MonthlySalesChart from "../components/Detailstaffmonthly";
import { getGeneratedToken } from "../../Services/API";
import '../css/StaffReportDetails.css';

const DetailStaff = () => {
    const location = useLocation();
    const { data } = location.state;
    const [token, setToken] = useState([]);
    const [daily, setDaily] = useState({ labels: [], salesData: [], tokenData: [] });
    const [monthly, setMonthly] = useState({ numOfToken: 0, amount: 0, tokenData: [] });

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

        let sum = 0;
        let tokenCount = 0;

        monthlyData.forEach(dat => {
            sum += dat.grandTotal;
            tokenCount += dat.numOfToken;
        });

        setMonthly({
            numOfToken: tokenCount,
            amount: sum,
            tokenData: monthlyData
        });
    }

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
                            <p>{monthly.tokenData.length}</p>
                        </div>
                        <div className="sr-daily-content">
                            <p>Total amount</p>
                            <p>{monthly.amount}</p>
                        </div>
                    </div>
                    {/* Monthly Sales Chart */}
                    <div className="sr-daily-detail-graph">
                    <MonthlySalesChart monthlyData={monthly.tokenData} />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailStaff;
