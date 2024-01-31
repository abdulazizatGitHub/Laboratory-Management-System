import React, { useState } from "react";
import NamingBar from "../components/NamingBar";
import "../CSS/ViewTestReport.css";
const SearchTestReport = () => {

    const [queryByContact, setQueryByContact] = useState('')
    const [queryByToken, setQueryByToken] = useState('')
    const [selectedField, setSelectedField] = useState("Contact");

    const [reportData, setReportData] = useState([
        { id: 1, patientName: "ABC", testNames: ["efs", "zyz", "imn"], token: "20125-4158", contact: "0322-0002889", deliveryTime: "1:30 PM", status: "Final", totalAmountPaid: "1000" },
        { id: 2, patientName: "XYZ", testNames: ["efs", "zyz", "imn"], token: "20135-4158", contact: "0311-0001119", deliveryTime: "1:30 PM", status: "Final", totalAmountPaid: "1000" },
        { id: 3, patientName: "LMN", testNames: ["efs", "zyz", "imn"], token: "20145-4158", contact: "0333-0001339", deliveryTime: "1:30 PM", status: "Final", totalAmountPaid: "1000" },
        { id: 4, patientName: "PQR", testNames: ["efs", "zyz", "imn"], token: "20155-4158", contact: "0344-0001339", deliveryTime: "1:30 PM", status: "Final", totalAmountPaid: "1000" },
        { id: 5, patientName: "STU", testNames: ["efs", "zyz", "imn"], token: "20165-4158", contact: "0345-0001229", deliveryTime: "1:30 PM", status: "Final", totalAmountPaid: "1000" },
        { id: 6, patientName: "DFE", testNames: ["efs", "zyz", "imn"], token: "20175-4158", contact: "0355-0001159", deliveryTime: "1:30 PM", status: "Final", totalAmountPaid: "1000" },
        { id: 7, patientName: "JKL", testNames: ["efs", "zyz", "imn"], token: "20185-4158", contact: "0316-0001669", deliveryTime: "1:30 PM", status: "Final", totalAmountPaid: "1000" },
        { id: 8, patientName: "TYU", testNames: ["efs", "zyz", "imn"], token: "20195-4158", contact: "0316-0001609", deliveryTime: "1:30 PM", status: "Final", totalAmountPaid: "1000" },
        { id: 9, patientName: "NJI", testNames: ["efs", "zyz", "imn"], token: "20115-4158", contact: "0316-0005669", deliveryTime: "1:30 PM", status: "Final", totalAmountPaid: "1000" },
        { id: 10, patientName: "FGT", testNames: ["efs", "zyz", "imn"], token: "20182-4158", contact: "0316-0002669", deliveryTime: "1:30 PM", status: "Final", totalAmountPaid: "1000" },
        ])

    const handleFieldChange = (event) => {
        setSelectedField(event.target.value);
    }

    const handleQueryChangeByContact = (event) => {
        const value = event.target.value;
        setQueryByContact(value);
    }

    const handleQueryChangeByToken=(event)=>{
            const value = event.target.value;
            setQueryByToken(value);
    }

    const handleReceipt =()=>{
        console.log("Printing Receipt");
    }

    const filteredData = selectedField === 'Contact'
    ? reportData.filter(data => data.contact.toLowerCase().includes(queryByContact.toLowerCase()))
    : reportData.filter(data => data.token.toLowerCase().includes(queryByToken.toLowerCase()));


    return (<div id="ViewTestReport">
        <NamingBar name={"SEARCH TEST REPORTS"} />
        <form className="ViewTestReport-innerComponent">
            <div className="ViewTestReport-searchDivs">
                <p className="ViewTestReport-Text">Contact#</p>
                <div className="ViewTestReport-inputDivs">
                    <input
                        type="radio"
                        value="Contact"
                        checked={selectedField === "Contact"}
                        onChange={handleFieldChange}
                        className="ViewTestReport-radio"
                    />
                    <input
                        type="text"
                        value={queryByContact}
                        onChange={handleQueryChangeByContact}
                        placeholder="Search"
                        disabled={selectedField !== "Contact"}
                        className="ViewTestReport-searchBox"
                    />
                </div>
            </div>

            <div className="ViewTestReport-searchDivs">
                <p className="ViewTestReport-Text">Token#</p>
                <div className="ViewTestReport-inputDivs">
                    <input
                        type="radio"
                        value="Token"
                        checked={selectedField === "Token"}
                        onChange={handleFieldChange}
                        className="ViewTestReport-radio"
                    />
                    <input
                        type="text"
                        value={queryByToken}
                        onChange={handleQueryChangeByToken}
                        placeholder="Search"
                        disabled={selectedField !== "Token"}
                        className="ViewTestReport-searchBox"
                    />
                </div>
            </div>
        </form>

        <div className="ViewTestReport-innerComponent TableDiv">
            <table className="ViewTestReport-Table">
                <thead id="ViewTestReport-TableHead">
                    <tr >

                        <th>Patient Name</th>
                        <th>Test Name</th>
                        <th>Token</th>
                        <th>Contact</th>
                        <th>Delivery Time</th>
                        <th>Status</th>
                        <th>Total Amount Paid</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                <tbody >
                    {
                        filteredData.map((d) => (
                            <tr key={d.id}>
                                <td>{d.patientName}</td>
                                <td>{d.testNames.join(", ")}</td>
                                <td>{d.token}</td>
                                <td>{d.contact}</td>
                                <td>{d.deliveryTime}</td>
                                <td>{d.status}</td>
                                <td>{d.totalAmountPaid}</td>
                                <td><button type="submit" id="ViewTestReport-roundButton" onClick={handleReceipt}>Receipt</button></td>
                            </tr>
                        ))

                    }
                </tbody>
            </table>
        </div>
    </div>)
}

export default SearchTestReport;