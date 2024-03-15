import React, { useState, useEffect } from "react";
import "../css/AdminDashboard.css"; // Import CSS file here
import NameBar from "../components/NameBar";
import MonthlySalesChart from "../../receptionist/components/MonthlySalesChart";
import ReactLoading from 'react-loading';

const AdminDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [monthlySalesData, setMonthlySalesData] = useState([]);

    useEffect(() => {
        fetchMonthlySalesData();
    }, []);

    const fetchMonthlySalesData = async () => {
        try {
            // Simulating API call to fetch monthly sales data
            const monthlySalesDataFromAPI = [
                { dateOfMonth: '5', sales: 10000 },
                { dateOfMonth: '10', sales: 10000 },
                { dateOfMonth: '15', sales: 5000 },
                { dateOfMonth: '16', sales: 10000 },
                { dateOfMonth: '20', sales: 5000 },
                { dateOfMonth: '24', sales: 10000 },
                { dateOfMonth: '30', sales: 10000 },
            ];
            setMonthlySalesData(monthlySalesDataFromAPI);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching monthly sales data:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="loader-container">
                <ReactLoading type={"bars"} color={"#03fc4e"} height={100} width={100} />
            </div>
        );
    }

    return (
        <div id="AdminDashboard">
            <NameBar name="Daily Report" />
            <div className="AdminDashboard-subContainer">
                <div className="adminDash-equalBoxes">
                    <div className="admin-boxContainer">
                        <div className="admin-smallbox">
                            <p className="admin-text">Total # of Test</p>
                            <p className="admin-text">80</p>
                        </div>
                        <div className="admin-smallbox">
                            <p className="admin-text">Total Amount</p>
                            <p className="admin-text">20000</p>
                        </div>
                    </div>

                    <div className="admin-boxContainer">
                        <div className="admin-smallbox">
                            <p className="admin-text">Total # of X-Ray</p>
                            <p className="admin-text">80</p>
                        </div>
                        <div className="admin-smallbox">
                            <p className="admin-text">Total Amount</p>
                            <p className="admin-text">20000</p>
                        </div>
                    </div>

                    <div className="admin-boxContainer">
                        <div className="admin-smallbox">
                            <p className="admin-text">Total # of ECG</p>
                            <p className="admin-text">80</p>
                        </div>
                        <div className="admin-smallbox">
                            <p className="admin-text">Total Amount</p>
                            <p className="admin-text">20000</p>
                        </div>
                    </div>
                </div>
                <div className="adminDash-equalBoxes">
                    <MonthlySalesChart data={monthlySalesData} />
                </div>
            </div>
            <div className="AdminDashboard-subContainer">
                <div className="Admin-Bottom-divs">
                    <p className="admin-text">Total # of Employees</p>
                    <p className="admin-text">15</p>
                </div>
                <div className="Admin-Bottom-divs">
                    <p className="admin-text">Total # of Patients</p>
                    <p className="admin-text">100</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
