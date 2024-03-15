import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTests, fetchTokenCount, getAllPatientNumbers, getGeneratedToken } from '../../Services/API'; // Update import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask, faDollarSign, faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import DailySalesChart from '../components/DailySalesChart';
import MonthlySalesChart from '../components/MonthlySalesChart';
import ReactLoading from 'react-loading';
import '../CSS/Dashboard.css';
import img1 from '../../Assessts/Images/Profile1.jpg';

const Dashboard = () => {
    const [numberOfTests, setNumberOfTests] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalPatients, setTotalPatients] = useState(0);
    const [tokensGenerated, setTokensGenerated] = useState(0);
    const [dailySalesData, setDailySalesData] = useState([]);
    const [monthlySalesData, setMonthlySalesData] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Initialize loading state to true
    const navigation = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    getTests(),
                    fetchToken(),
                    fetchPatient(),
                    getDailySales(),
                    getMonthlySales(),
                    fetchUser(),
                ]);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Set loading to false when all data fetching is complete
            }
        };

        fetchData();
    }, []);

    const fetchUser = async () => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            // Redirect to login if user data is not available
            navigation('/');
        }
    };

    const getTests = async () => {
        const result = await getAllTests();
        setNumberOfTests(result.length);
    };

    const fetchToken = async () => {
        const tokencount = await getGeneratedToken();
        setTokensGenerated(tokencount.length);
    };

    const fetchPatient = async () => {
        const patientCount = await getAllPatientNumbers();
        setTotalPatients(patientCount);
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
            {loading ? ( // Render loader if loading is true
                <div className="loader-container">
                    <ReactLoading type={"bars"} color={"#03fc4e"} height={100} width={100} />
                </div>
            ) : (
                <React.Fragment>
                    {user && (
                        <div className="Profile">
                            <div className="Image-details">
                                <img src={user.image.url} className="profile-image" />
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
                </React.Fragment>
            )}
        </div>
    );
}

export default Dashboard;
