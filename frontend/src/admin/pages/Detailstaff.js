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
        console.log("Token is ", token, " and cnic ", data.userName)

        const dailyData = token.filter(tkn => {
            let dateStr = tkn.dateTime;
            let dateObj = new Date(dateStr);
            let mnthNum = dateObj.getMonth() + 1 ;
            if (mnthNum == new Date().getMonth()+1 ) {
                return tkn;
            }


        })

        let sum = 0;

        dailyData.forEach((dat) => {
            sum += dat.grandTotal;
        });

        setMonthly({
            numOfToken: dailyData.length,
            amount: sum
        });
    }

    // // Dummy data for demonstration
    // const dailySalesData = [
    //     { date: 'Monday', sales: 200, tokens: 20 },
    //     { date: 'Tuesday', sales: 250, tokens: 25 },
    //     { date: 'Wednesday', sales: 300, tokens: 30 },
    //     { date: 'Thursday', sales: 350, tokens: 35 },
    //     { date: 'Friday', sales: 320, tokens: 32 },
    //     { date: 'Saturday', sales: 280, tokens: 28 },
    //     { date: 'Sunday', sales: 400, tokens: 40 }
    // ];

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
                        <MonthlySalesChart data={monthlySalesData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailStaff;
