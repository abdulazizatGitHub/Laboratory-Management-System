import React, { useEffect, useRef, useState } from "react";
import '../css/Report.css'
import { FaPhone, FaEnvelope } from 'react-icons/fa'; // Importing the icons from react-icons library
import img1 from '../../Assessts/Images/Logo2.png';
import { useLocation, useNavigate } from "react-router-dom";
import JsBarcode from 'jsbarcode';
import { addPhlebotomyReport, updateToken } from "../../Services/API";

function Report() {

    const location = useLocation();
    const { selectedRegistrationDetails } = location.state;

    const [generatedDateTime, setGeneratedDateTime] = useState("");
    const [testResults, setTestResults] = useState({});
    const canvasRef = useRef(null);
    const navigation = useNavigate();

    useEffect(() => {
        if (canvasRef.current) {
            const pinToEncode = selectedRegistrationDetails.patientData.pin;
            JsBarcode(canvasRef.current, pinToEncode, {
                format: "CODE128",
                displayValue: true,
                width: 1,
                height: 40,
                margin: 10,
                fontSize: 12 // Adjust the font size as needed
            });
        }
    }, [selectedRegistrationDetails]);

    const handleInputChange = (testName, value) => {
        setTestResults(prevResults => {
            // Use a copy of the previous state to avoid modifying it directly
            const newResults = { ...prevResults };
            // Update the specific test in the copied state
            newResults[testName] = value;
            // Return the updated state
            return newResults;
        });
    };


    // Function to print only the Main-Report-container div
    const handlePrint = () => {
        printDiv("Main-report");
    };

    // Function to print a specific div by its id or class name
    const printDiv = (elementId) => {
        var printContents = document.getElementsByClassName(elementId)[0].innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    };

    
    const handleAddPhlebotomyReport = async (e) => {
        e.preventDefault();

        const currentDate = new Date();
        const options = { timeZone: 'Asia/Karachi', hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const formattedTime = currentDate.toLocaleTimeString('en-US', options);
        
        // console.log("Current Time in Pakistan: ", formattedTime);

        const date = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();

        const generatedDateTime = `${year}-${('0' + month).slice(-2)}-${('0' + date).slice(-2)}`;



        
        

        // Create an array of formatted tests
        const formattedTests = selectedRegistrationDetails.tests.map((data) => {
            const testName = data.name;
            const inputValue = testResults[testName] || ""; // Get the input value associated with the test

            return {
                name: testName,
                result: inputValue,
                referenceValue: selectedRegistrationDetails.patientData.gender === 'male'
                    ? `${data.normalRange.male.from} - ${data.normalRange.male.to}`
                    : `${data.normalRange.female.from} - ${data.normalRange.female.to}`,
                unit: data.unit,
            };
        });

        handleFinalized();

        const reportData = {
            tokenNumber: selectedRegistrationDetails.tokenNumber,
            state: "Finalized", // Replace with your actual state
            patientDetails: selectedRegistrationDetails.patientData,
            report: formattedTests,
            remarks: selectedRegistrationDetails.remark, // Replace with your actual remarks
            generatedBy: JSON.parse(localStorage.getItem("user")).name,
            dateTime: generatedDateTime,
             time:formattedTime
        };


        console.log('The report data is: ', reportData);

            try {
                const response = await addPhlebotomyReport(reportData);

                if(response.data.message === true) {
                    alert('Report has been finalized successfully');
                    
                    navigation('/phelobotny/phlebotomy');
                } else {
                    alert('Error try again to finalize the report');
                }

            } catch (error) {
                console.log('The error in saving the report data is: ', error);
            }
        }
        const handleFinalized = async () => {

            try {
                const tokenId = selectedRegistrationDetails._id;
                const state = "Finalized";
              const updatedTokenData = { ...selectedRegistrationDetails, state };

             await updateToken(tokenId, updatedTokenData);

            } catch (error) {
                console.error('Error occurred while saving finilized phlebotomy data:', error);
            }
    };

    return (
        <div className="Main-Report-container">
            <section className="Main-report">
                <div className="Header-report">
                    <div className="Report-smCnt">
                        <div className="Report-left-image">
                            <img src={img1} alt="Logo" className="logo-image" />
                        </div>
                        <div className="Report-Middle">
                            <span className="report-heading-effect"><h1>SIRAJ SHAHEED MEDICAL LAB</h1></span>
                            <h3>ACCURATE , CARING , INSTANT</h3>
                            <p>Opposite Cat A Hospital DHQ Batkhela Distt Malakand 230100</p>
                        </div>
                    </div>
                    <div className="Report-Right">
                        <a><FaPhone color='#6ec007' /> 03000-98545565/0303-0094836</a>
                        <a><FaEnvelope color='#6ec007' /> doctorkhan123@gmail.com</a>
                    </div>
                </div>

                <div className="Middle-Report-Section-Color"></div>

                <div className="Middle-Report-Section">
                    <div className="L-Report">
                        <h3>{selectedRegistrationDetails.patientData.name}</h3>
                        <p>PID: {selectedRegistrationDetails.patientData.pin}</p>
                        <p>AGE: {selectedRegistrationDetails.patientData.age} / {selectedRegistrationDetails.patientData.gender}</p>
                        <p>Contact #: {selectedRegistrationDetails.patientData.mobileNumber}</p>
                        <p>Address: {selectedRegistrationDetails.patientData.address}</p>
                    </div>
                    <span className="R-Line"></span>

                    <div className="M-Report">
                        <h3>Sample Collected At:</h3>
                        <p>Siraj Shaheed Medical Laboratory Batkhela</p>
                        <h4>Ref By: {selectedRegistrationDetails.patientData.refDoctor} </h4>
                    </div>
                    <span className="R-Line"></span>

                    <div className="R-Report">
                        <div className="bar-code"> <canvas ref={canvasRef} /></div>

                        {/* <div className="generated">
                            <p >Reffered on:12:23pm</p>
                            <p>Reported on:12:20pm</p>
                            <p>Collected on:12:30pm</p>
                        </div> */}

                    </div>

                </div>

                <div className="Middle-text">
                    <h2>Complete Blood Count (CBC) With Absolute Count</h2>
                </div>

                <div className="Table-report">
                    <table className="medical-lab-report-table">
                        <thead className="tableHead-report">
                            <tr className="tableHead-row">
                                <th>Investigation</th>
                                <th>Result</th>
                                <th>Reference Value</th>
                                <th>Unit</th>
                            </tr>
                        </thead>
                        <tbody className="tableBody-report">
                            {selectedRegistrationDetails.tests.map((data) => (
                                <tr key={data._id} className="tableBody-row">
                                    <td>{data.name}</td>
                                    <td> <input type="text"
                                        placeholder="Enter value"
                                        id="input-report"
                                        value={testResults[data.name] || ""}
                                        onChange={(e) => handleInputChange(data.name, e.target.value)}
                                    />
                                    </td>
                                    <td>{selectedRegistrationDetails.patientData.gender === 'male' ? data.normalRange.male.from + ' - ' + data.normalRange.male.to : data.normalRange.female.from + ' - ' + data.normalRange.female.to}</td>
                                    <td>{data.unit}</td>
                                </tr>
                            ))

                            }

                        </tbody>
                    </table>
                </div>

                <div className="Footer-Section">
                    <p className="Footer-Section-heading">This Report is For intended Doctor Reference Only</p>

                    <div className="Details-Footer">

                        <div className="Fl-report" >
                            <p>Report Preparaed By</p>

                            <h4>{JSON.parse(localStorage.getItem('user')).name}</h4>
                            <h5>Pathologist</h5>
                        </div>

                        <div className="Fl-report" >
                            <p>Reviewed By</p>

                            <h4>{JSON.parse(localStorage.getItem('user')).name}</h4>
                            <h5>Pathologist</h5>
                        </div>
                    </div>

                    <p className="generated-time">{generatedDateTime || 'Not finalized yet'}</p>
                    <div className="report-bottom-bar-code"></div>


                </div>
            </section>

            <div className="sr-button-container">
                <button onClick={handleAddPhlebotomyReport}>Finalized</button>
            </div>
        </div>
    )
}
export default Report;
