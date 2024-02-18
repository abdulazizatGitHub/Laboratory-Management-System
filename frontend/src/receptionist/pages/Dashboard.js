// Dashboard.js
import '../CSS/Dashboard.css';
import img1 from '../../Assessts/Images/Profile1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask, faDollarSign, faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import DailySalesChart from '../components/DailySalesChart';
import MonthlySalesChart from '../components/MonthlySalesChart';
import React, { useState, useEffect } from "react";
import { getAllTests, fetchTokenCount, getAllPatient } from '../../Services/API'; // Update import

const Dashboard = () => {
    const [numberOfTests, setNumberOfTests] = useState([]);
    const [totalAmount, setTotalAmount] = useState(19250);
    const [totalPatients, setTotalPatients] = useState(0);
    const [tokensGenerated, setTokensGenerated] = useState(0);

    const dailySalesData = [
        { timeOfDay: '18', sales: 40 },
        { timeOfDay: '20', sales: 20 },
        { timeOfDay: '22', sales: 2 },
        { timeOfDay: '24', sales: 4 },
        { timeOfDay: '00', sales: 6 },
        { timeOfDay: '02', sales: 8 },
        { timeOfDay: '04', sales: 10 },
        { timeOfDay: '06', sales: 12 },
        { timeOfDay: '08', sales: 14 },
        { timeOfDay: '10', sales: 16 },
      ];
  
      const monthlySalesData = [
        { dateOfMonth: '24', sales: 20000 },
        { dateOfMonth: '30', sales: 10000 },
        { dateOfMonth: '15', sales: 4 },
        { dateOfMonth: '5', sales: 8 },
        { dateOfMonth: '10', sales: 12 },
        { dateOfDay: '15', sales: 16 },
        { dateOfMonth: '20', sales: 20 },
      ];

    useEffect(() => {
        getTests();
        fetchToken();
        fetchpatient();
    }, []);

    const getTests = async () => {
        try {
            const result = await getAllTests();
            setNumberOfTests(result.length);
        } catch (error) {
            console.error('Error fetching tests:', error);
        }
    };

    const fetchToken = async () =>{
        try{
            const tokencount= await fetchTokenCount();
            setTokensGenerated(tokencount);
        }catch(error){
            console.error("Error whhile Fecthing Token",error);
        }
    }
    const fetchpatient = async () => {
        try {
            const patientCount = await getAllPatient();
            console.log("The Total Patients are", patientCount);
            setTotalPatients(patientCount.patientCount); // Update the state
        } catch (error) {
            console.error("Error in Patient", error);
        }
    };
    
    return (
        <div className="Main-Container">
            <div className="Profile">
                <div className="Image-details">
                    <img src={img1} className="profile-image" />
                </div>

                <div className="Profile-details">
                    <div className="upper-profile">
                        <p className="bold-light">NAME</p>
                        <p>Mahad Khan</p>
                    </div>

                    <div className="lower-profile">
                        <p className="bold-light">FATHER NAME</p>
                        <p>Khan</p>
                    </div>
                </div>

                <div className="Middle-details">
                    <div className="Middle-upper-profile">
                        <p className="bold-light">GENDER</p>
                        <p>Male</p>
                    </div>

                    <div className="Middle-lower-profile">
                        <p className="bold-light">DATE OF BIRTH</p>
                        <p>Khan</p>
                    </div>
                </div>

                <div className="Last-details">
                    <div className="Last-upper-profile">
                        <p className="bold-light">CONTACT</p>
                        <p>065415151121</p>
                    </div>

                    <div className="Last-lower-profile">
                        <p className="bold-light">CNIC</p>
                        <p>16101-8233468-5</p>
                    </div>
                </div>
            </div>

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
                    <DailySalesChart data={dailySalesData} />
                  </div>
                  <div className="chart-container">
                    <h3>MONTHLY SALES CHART</h3>
                    <MonthlySalesChart data={monthlySalesData} />
                  </div>
                </div>
        </div>
    );
}

export default Dashboard;
