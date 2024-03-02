import React, { useEffect, useRef, useState } from "react";
import '../CSS/ReportDetailsPage.css';
import { FaPhone, FaEnvelope } from 'react-icons/fa'; // Importing the icons from react-icons library
import img1 from '../../Assessts/Images/Logo2.png';
import { useLocation, useNavigate } from "react-router-dom";
import JsBarcode from 'jsbarcode';
import { addPhlebotomyReport, updateToken } from "../../Services/API";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function ReportDetailsPage() {

    const location = useLocation();
    const { data } = location.state;

    const canvasRef = useRef(null);

    useEffect(() => {
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

    // Function to save the Main-report div as PDF
    // Function to save the Main-report div as PDF
    const handleSaveAsPDF = () => {
        const input = document.getElementById("Main-report");
        console.log("helo kkkkkkkkkkkkkkk")
        html2canvas(input, {
            scale: 2,
            logging: true, // Enable logging to debug any potential issues
            preserveDrawingBuffer: true // Preserve the drawing buffer to capture text properly
        }).then((canvas) => {
            const pdf = new jsPDF("p", "mm", "a4");
            const imgData = canvas.toDataURL("image/png");
            const imgWidth = 210;
            const pageHeight = 295;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            const filename = `report_${Date.now()}.pdf`;
            pdf.save(filename);

        });
    };



    return (
        <div className="Main-Report-container">
            <section id="Main-report" className="Main-report">
                <div className="Header-report">
                    <div className="Report-smCnt">
                        <div className="Report-left-image">
                            <img src={img1} alt="Logo" className="logo-image" />
                        </div>
                        <div className="Report-Middle">
                            <span ><h1>SIRAJ SHAHEED MEDICAL LAB</h1></span>
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
                        <h3>{data.patientDetails.name}</h3>
                        <p>PID: {data.patientDetails.pin}</p>
                        <p>AGE: {data.patientDetails.age} / {data.patientDetails.gender}</p>
                        <p>Contact #: {data.patientDetails.mobileNumber}</p>
                        <p>Address: {data.patientDetails.address}</p>
                    </div>
                    <span className="R-Line"></span>

                    <div className="M-Report">
                        <h3>Sample Collected At:</h3>
                        <p>Siraj Shaheed Medical Laboratory Batkhela</p>
                        <h4>Ref By: {data.patientDetails.refDoctor}</h4>
                    </div>
                    <span className="R-Line"></span>

                    <div className="R-Report">
                        <div className="bar-code"> <canvas ref={canvasRef} /></div>

                        <div className="generated">
                            <p>Reffered on:12:23pm</p>
                            <p>Reported on:12:20pm</p>
                            <p>Collected on:12:30pm</p>
                        </div>

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
                            {data.report.map((data, index) => (

                                <tr key={index} className="tableBody-row">
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

                <div className="Footer-Section">
                    <p className="Footer-Section-heading">This Report is For intended Doctor Reference Only</p>

                    <div className="Details-Footer">

                        <div className="Fl-report" >
                            <p>Report Preparaed By</p>

                            {data.generatedBy}
                            <h5>Pathologist</h5>
                        </div>

                        <div className="Fl-report" >
                            <p>Reviewed By</p>

                            {data.generatedBy}
                            <h5>Pathologist</h5>
                        </div>
                    </div>

                    <p className="generated-time"> Prepared On: {data.dateTime}</p>
                    <div className="report-bottom-bar-code"></div>


                </div>
            </section>

            <div className="sr-button-container">
                <button onClick={handleSaveAsPDF}>Print</button>
            </div>
        </div>
    )
}
export default ReportDetailsPage;
