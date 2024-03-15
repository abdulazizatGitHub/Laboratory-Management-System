import React, { useEffect, useRef, useState } from "react";
import '../CSS/ReportDetailsPage.css';
import { FaPhone, FaEnvelope } from 'react-icons/fa'; // Importing the icons from react-icons library
import img1 from '../../Assessts/Images/Logo2.png';
import { useLocation, useNavigate } from "react-router-dom";
import JsBarcode from 'jsbarcode';
import { addPhlebotomyReport, updateReport, updateToken } from "../../Services/API";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useReactToPrint } from 'react-to-print';
function ReportDetailsPage() {

    const location = useLocation();
    const { data } = location.state;

    const canvasRef = useRef(null);
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        console.log(data)
        if (canvasRef.current) {
            const pinToEncode = data.patientDetails.pin;
            JsBarcode(canvasRef.current, pinToEncode, {
                format: "CODE128",
                displayValue: true,
                width: 1,
                height: 40,
                margin: 10,
                fontSize: 12 // Adjust the font size as needed
            });
        }
    }, [data]);

    const customAlert=(msg)=>{
        const confirm = window.confirm(msg);
        if(confirm){
            return "yes"
        }
        
        return "no"
        
    }

    // Function to save the Main-report div as PDF
    // Function to save the Main-report div as PDF
    const handleSaveAsPDF = () => {
        let pr="yes";
        if(data.state==="Delivered"){
            pr=customAlert(
                "The report is already Delivered .... Would you like to print it?"  
            )
        }
        else{
        handleDelivered();
        }

        
        if(pr=="yes"){
            handlePrint();
        }
        
    };

    const handleDelivered = async () => {

        try {
            const reportId = data._id;
            const state = "Delivered";
          const updatedReportData = { ...data, state };


         const res = await updateReport(reportId, updatedReportData);
        data.state=state;
        //  console.log("updatedReportData is  ", updatedReportData, "and state is ",data.state);
        console.log("RES s ", res)

        } catch (error) {
            console.error('Error occurred while saving delivered report data:', error);
        }
    }
    


    return (
        <div className="RC-Main-Report-container">
            <section  ref={componentRef} id="Main-report" className="RC-Main-report">
                <div className="RC-Header-report">
                    <div className="RC-Report-smCnt">
                        <div className="RC-Report-left-image">
                            <img src={img1} alt="Logo" className="RC-logo-image" />
                        </div>
                        <div className="RC-Report-Middle">
                            <span ><h1>SIRAJ SHAHEED MEDICAL LAB</h1></span>
                            <h3>ACCURATE , CARING , INSTANT</h3>
                            <p>Opposite Cat A Hospital DHQ Batkhela Distt Malakand 230100</p>
                        </div>
                    </div>
                    <div className="RC-Report-Right">
                        <a><FaPhone color='#6ec007' /> 03000-98545565/0303-0094836</a>
                        <a><FaEnvelope color='#6ec007' /> doctorkhan123@gmail.com</a>
                    </div>
                </div>

                <div className="RC-Middle-Report-Section-Color"></div>

                <div className="RC-Middle-Report-Section">
                    <div className="RC-L-Report">
                        <h3>{data.patientDetails.name}</h3>
                        <p>PID: {data.patientDetails.pin}</p>
                        <p>AGE: {data.patientDetails.age} / {data.patientDetails.gender}</p>
                        <p>Contact #: {data.patientDetails.mobileNumber}</p>
                        <p>Address: {data.patientDetails.address}</p>
                    </div>
                    <span className="RC-R-Line"></span>

                    <div className="RC-M-Report">
                        <h3>Sample Collected At:</h3>
                        <p>Siraj Shaheed Medical Laboratory Batkhela</p>
                        <h4>Ref By: {data.patientDetails.refDoctor}</h4>
                    </div>
                    <span className="RC-R-Line"></span>

                    <div className="RC-R-Report">
                        <div className="RC-bar-code"> <canvas ref={canvasRef} /></div>

                        {/* <div className="RC-generated">
                            <p>Reffered on:12:23pm</p>
                            <p>Reported on:12:20pm</p>
                            <p>Collected on:12:30pm</p>
                        </div> */}

                    </div>

                </div>

                <div className="RC-Middle-text">
                    <h2>Complete Blood Count (CBC) With Absolute Count</h2>
                </div>

                <div className="RC-Table-report" style={{overflow:"visible", marginBottom:"0.5rem"}}>
                    <table className="RC-medical-lab-report-table" style={{height:"fit-content"}}>
                        <thead className="tableHead-report">
                            <tr className="tableHead-row">
                                <th>Investigation</th>
                                <th>Result</th>
                                <th>Reference Value</th>
                                <th>Unit</th>
                            </tr>
                        </thead>
                        <tbody className="tableBody-report">
                            {data.report.map((data, index) => (

                                <tr key={index} className="RC-tableBody-row" style={{backgroundColor:"transparent"}}>
                                    <td>{data.name}</td>
                                    <td>{data.result}</td>
                                    <td>{data.referenceValue}</td>
                                    <td>{data.unit}</td>
                                </tr>
                            ))

                            }

                        </tbody>
                    </table>
                </div>

                <div className="RC-Footer-Section">
                    <p className="RC-Footer-Section-heading">This Report is For intended Doctor Reference Only</p>

                    <div className="RC-Details-Footer" style={{height:"8rem"}}>

                        <div className="RC-Fl-report" style={{height:"auto"}}>
                            <p>Preparaed By</p>

                            {data.generatedBy}
                            <h5>Pathologist</h5>
                        </div>

                        <div className="RC-Fl-report" style={{height:"auto"}}>
                           
                            <p>Printed By</p>

                            {JSON.parse(localStorage.getItem('user')).name}
                            <h5>Receptionist</h5>
                        </div>
                    </div>

                    <p className="RC-generated-time"> Prepared On: {data.dateTime + " " + data.time}</p>
                    <div className="RC-Middle-Report-Section-Color"></div>


                </div>
            </section>

            <div className="RC-sr-button-container">
                <button onClick={handleSaveAsPDF}>Print</button>
            </div>
        </div>
    )
}
export default ReportDetailsPage;
