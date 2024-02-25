import React from "react";
import '../css/Report.css'
import { FaPhone, FaEnvelope } from 'react-icons/fa'; // Importing the icons from react-icons library
import img1 from '../../Assessts/Images/Logo2.png';

function Report() {

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
                        <a><FaPhone  color='#6ec007'/> 03000-98545565/0303-0094836</a>
                        <a><FaEnvelope color='#6ec007' /> doctorkhan123@gmail.com</a>
                    </div>
                </div>

                <div className="Middle-Report-Section-Color"></div>

                <div className="Middle-Report-Section">
                    <div className="L-Report">
                        <h3>Mahad Khan</h3>
                        <p>AGE:21 Years</p>
                        <p>Sex: Male</p>
                        <p>PID:55008</p>
                        <p>Address: XYX</p>
                    </div>
                    <span className="R-Line"></span>

                    <div className="M-Report">
                        <h3>Sample Collected At:</h3>
                        <p>Siraj Shaheed Medical Laboratory Batkhela</p>
                        <h4>Ref By: DR Sajjad Bukhari </h4>
                    </div>
                    <span className="R-Line"></span>

                    <div className="R-Report">
                        <p>Reffered on:12:23pm</p>
                        <p>Reported on:12:20pm</p>
                        <p>Collected on:12:30pm</p>
                    </div>

                </div>

                <div className="Middle-text">
                    <h2>Complete Blood Count (CBC) With Absolute Count</h2>
                </div>

                <div className="Table-report">
                    <table className="medical-lab-report-table">
                        <thead>
                            <tr>
                                <th>Investigation</th>
                                <th>Result</th>
                                <th>Reference Value</th>
                                <th>Unit</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Primary Sample Type:</td>
                                <td>Blood</td>
                            </tr>
                            <tr>
                                <td>Haemoglobin HB</td>
                            </tr>

                            <tr>
                                <td>Haemoglobin</td>
                                <td>13.6</td>
                                <td>14-17</td>
                                <td>g/dl</td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                <div className="Footer-Section">
                    <p className="Footer-Section-heading">This Report is For intended Doctor Reference Only</p>

                    <div className="Details-Footer">

                        <div className="Fl-report" >
                            <p>Report Preparaed By</p>
                            
                            <h4>DR Iqbal Hassan</h4>
                            <h5>MD Pathologist</h5>
                        </div>

                        <div className="Fl-report" >
                            <p>Reviewed By</p>
                            
                            <h4>DR Iqbal Hassan</h4>
                            <h5>MD Pathologist</h5>
                        </div>
                    </div>

                    <p className="generated-time">Generated on 5:30pm</p>
                    <div className="report-bottom-bar-code"></div>


                </div>
            </section>
        </div>
    )
}
export default Report;
