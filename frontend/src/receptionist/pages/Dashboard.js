// Dashboard.js
import '../CSS/Dashboard.css';
import img1 from '../../Assessts/Images/Profile1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask, faDollarSign, faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import DailySalesChart from '../components/DailySalesChart';
import MonthlySalesChart from '../components/MonthlySalesChart';
import React, { useState, useEffect } from "react";
import { getAllTests, fetchTokenCount, getAllPatientNumbers, getGeneratedToken } from '../../Services/API'; // Update import
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    
    const [numberOfTests, setNumberOfTests] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalPatients, setTotalPatients] = useState(0);
    const [tokensGenerated, setTokensGenerated] = useState(0);
    const [dailySalesData, setDailySalesData] = useState([]);
    const [monthlySalesData, setMonthlySalesData] = useState([]);
    const [user, setUser] = useState(null);
    const navigation = useNavigate();

    useEffect(() => {
        getTests();
        fetchToken();
        fetchPatient();
        getDailySales();
        getMonthlySales();
        
    }, []);

   
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            // Redirect to login if user data is not available
            navigation('/');
        }
    }, []);
   

    const getTests = async () => {
        try {
            const result = await getAllTests();
            setNumberOfTests(result.length);
        } catch (error) {
            console.error('Error fetching tests:', error);
        }
    };

    const fetchToken = async () => {
        const tokencount = await getGeneratedToken();

        setTokensGenerated(tokencount.length);
    };

    const fetchPatient = async () => {
        try {
            const patientCount = await getAllPatientNumbers();
            console.log("The Total Patients are", patientCount);
            setTotalPatients(patientCount); // Update the state
        } catch (error) {
            console.error("Error in Patient", error);
        }
    };

    const isToday = (someDate) => {
        const today = new Date();
        const date = new Date(someDate);
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    const getDailySales = async () => {
        const salesdata = await getGeneratedToken();
        const todayData = salesdata.filter(item => isToday(item.dateTime));
        console.log("The Daily Data is", todayData);
        setDailySalesData(todayData);
    };

    const getMonthlySales = async () => {
        const salesdata = await getGeneratedToken();
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const monthData = salesdata.filter(item => {
            const itemDate = new Date(item.dateTime);
            return itemDate >= firstDayOfMonth && itemDate <= lastDayOfMonth;
        });
        console.log("Current Month's Sales Data is", monthData);
        setMonthlySalesData(monthData);
    };

    const formattedDailySalesData = dailySalesData.map(data => ({
        timeOfDay: new Date(data.dateTime).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
        sales: data.grandTotal,
    }));

    const formattedMonthlySalesData = monthlySalesData.map(data => ({
        dateOfMonth: new Date(data.dateTime).getDate(),
        sales: data.grandTotal,
    }));

    useEffect(() => {
        calculateTotalAmount(); // Call the function to calculate total amount whenever monthly sales data changes
    }, [monthlySalesData]);

    const calculateTotalAmount = () => {
        let total = 0;
        monthlySalesData.forEach(item => {
            total += item.grandTotal;
        });
        setTotalAmount(total);
    };

    return (
        <div className="Main-Container">

{user && (
            <div className="Profile">
               
                <div className="Image-details">
                    <img src={`http://localhost:5000/uploads/${user.image}`} className="profile-image" />
                </div>

                <div className='profile-info'>
                    <div className="profile-divs">
                        <p className="bold-light">NAME</p>
                        <p>{user.name}</p>
                    </div>

                    <div className="profile-divs">
                        <p className="bold-light">FATHER NAME</p>
                        <p>{user.fatherName}</p>
                    </div>



                    <div className="profile-divs">
                        <p className="bold-light">GENDER</p>
                        <p>{user.gender}</p>
                    </div>

                    <div className="profile-divs">
                        <p className="bold-light">ADDRESS</p>
                        <p>{user.address}</p>
                    </div>



                    <div className="profile-divs">
                        <p className="bold-light">CONTACT</p>
                        <p>{user.contactNumber}</p>
                    </div>

                    <div className="profile-divs">
                        <p className="bold-light">CNIC</p>
                        <p>{user.cnic}</p>
                    </div>
                </div>
            </div>

)}

            <div className="dashboard">
                <div className="dashboard-item">
                    <h3>NUMBER OF TESTS</h3>
                    <p ><FontAwesomeIcon icon={faFlask} />{numberOfTests}</p>
                </div>
                <div className="dashboard-item">
                    <h3>TOTAL AMOUNT</h3>
                    <p>  <FontAwesomeIcon icon={faDollarSign} />{totalAmount}</p>
                </div>
                <div className="dashboard-item">
                    <h3>TOTAL PATIENT</h3>
                    <p>  <FontAwesomeIcon icon={faUser} /> {totalPatients}</p>
                </div>
                <div className="dashboard-item">
                    <h3>TOKENS GENERATED</h3>
                    <p><FontAwesomeIcon icon={faKey} /> {tokensGenerated}</p>
                </div>
            </div>
            <div className="dashboard-charts">
                <div className="chart-container">
                    <h3>DAILY SALES CHART</h3>
                    <DailySalesChart data={formattedDailySalesData} />
                </div>
                <div className="chart-container">
                    <h3>MONTHLY SALES CHART</h3>
                    <MonthlySalesChart data={formattedMonthlySalesData} />
                </div>
            </div>
        </div>

    );
}

export default Dashboard;
