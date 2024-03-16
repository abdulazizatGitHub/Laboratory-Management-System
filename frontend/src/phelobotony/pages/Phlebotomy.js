import React, { useState, useEffect, useRef } from "react";
import '../css/Phlebotomy.css';
import { Link, useNavigate } from 'react-router-dom';
import { getGeneratedToken, updateToken } from "../../Services/API";
import JsBarcode from 'jsbarcode';
import jsPDF from 'jspdf';
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TbCalendarPlus } from "react-icons/tb";

const formatDate = (date) => {
    // Format the date as "MM/dd/yyyy"
    const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date
        .getDate()
        .toString()
        .padStart(2, '0')}/${date.getFullYear()}`;
    return formattedDate;
};



const Phlebotomy = () => {
    const fromDatePickerRef = useRef(null); // Ref for "From Date" picker
    const toDatePickerRef = useRef(null); // Ref for "To Date" picker

    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [selectedOption, setSelectedOption] = useState('All Records'); // Set the default selected option
    const [selectedRegistrationDetails, setSelectedRegistrationDetails] = useState(null);
    const [remarks, setRemarks] = useState('');
    const [state, setState] = useState('');
    const navigation = useNavigate();
    //By basit
    const [allToken, setAllTokens] = useState([]);
    useEffect(() => {
        const fetchTokenDetails = async () => {
            try {
                const res = await getGeneratedToken();

                setAllTokens(res);

            } catch (error) {
                console.log('Error occure in fetching the token data', error);
            }
        }
        fetchTokenDetails();
    }, [state]);




    useEffect(() => {
        // Set default "to" date to today in the format "YYYY-MM-DD"
        // const today = new Date();
        // const formattedDate = today.toISOString().split('T')[0];
        // setToDate(formattedDate);

        // Set default "from" date to 10 days ago
        // const tenDaysAgo = new Date();
        // tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
        // const formattedFromDate = tenDaysAgo.toISOString().split('T')[0];
        // setFromDate(formattedFromDate);
    }, []);

    const dateOptions = Array.from({ length: 10 }, (_, index) => {
        const date = new Date();
        date.setDate(date.getDate() - index);
        return date.toISOString().split('T')[0];
    });



    const handleOptionChange = (e) => {
        console.log("Target value: ", e.target.value);
        setSelectedOption(e.target.value);
    };

    const handlePatientClick = (pin) => {
        let selectedPatientData = allToken.find(patient => patient.patientData.pin === pin);
        setSelectedRegistrationDetails(selectedPatientData);
    };


    const handleTransferData = () => {
        if (selectedRegistrationDetails.remark !== "")
            navigation('/phelobotny/phlebotomy/Report', { state: { selectedRegistrationDetails } });
        else
            alert("Remarks are required")
    }

    const handleTransferToPending = async () => {

        if (!remarks && selectedRegistrationDetails.remark === "") {

            alert('Remarks field is required .');
            return;
        }

        if (selectedRegistrationDetails.state === "pending") {
            alert("Already in Pending State ")
            return;
        }
        try {
            const tokenId = selectedRegistrationDetails._id;
            const state = "pending";
            const updatedTokenData = { ...selectedRegistrationDetails, state };

            await updateToken(tokenId, updatedTokenData);
            setSelectedRegistrationDetails(updatedTokenData);
            setState(state);
            alert("Set To Pending successfully");
        } catch (error) {
            console.error('Error occurred while saving pending phlebotomy data:', error);
        }
    };

    const handleAddRemark = async () => {
        try {

            if (!remarks) {
                alert('Remarks field is required.');
                return;
            }

            const tokenId = selectedRegistrationDetails._id;
            const updatedTokenData = { ...selectedRegistrationDetails, remark: remarks };
            setSelectedRegistrationDetails(updatedTokenData);
            await updateToken(tokenId, updatedTokenData);
            setRemarks('');
        } catch (error) {
            console.error('Error occurred while adding remarks:', error);
        }
    };


    const generateBarcodeAndSaveToPDF = () => {
        if (!selectedRegistrationDetails) {
            alert('Please select a patient.');
            return;
        }
    
        const barcodeValue = selectedRegistrationDetails.patientData.pin;
        const patientName = selectedRegistrationDetails.patientData.name;
    
        // Create a canvas element to render the barcode
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
    
        // Generate barcode with PIN (avoid including patient name in the barcode itself)
        JsBarcode(canvas, barcodeValue, {
            format: "CODE128",
            displayValue: true,
            width: 0.8,
            height: 15,
            fontSize: 18,
            margin: 8
        });

        const fontStyle = '10px Arial'; // Adjust font size and family as needed
        ctx.font = fontStyle;
        ctx.fillText(patientName, -43, 7); 

        ctx.drawImage(canvas, Math.max(patientName.length * 8, 10), 40);
    
        const pinWidth = ctx.measureText(barcodeValue).width;
        ctx.fillText(barcodeValue, (canvas.width - pinWidth) / 2, canvas.height + 10); 
    
        const imgData = canvas.toDataURL();
        const windowContent = `<img src="${imgData}" style="display:block;margin:auto;">`;
        const printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write(`<html><head><title>Print Barcode</title></head><body onload="window.print();">${windowContent}</body></html>`);
        printWindow.document.close();
    };
    




    // const filteredRecords = selectedOption === 'Pending Phlebotomy' ? pendingPhlebotomy : registrationDetails;
    // const filteredTotalRecords = registrationDetails.filter(token => !pendingPhlebotomy.some(p => p.patientData.pin === token.patientData.pin));
    const AllRecords = allToken ? allToken.filter(tkn => tkn.state === "generated" && (fromDate!=null ? (toDate!=null ? formatDate(new Date(tkn.dateTime))>=fromDate && formatDate(new Date(tkn.dateTime))<=toDate:formatDate(new Date(tkn.dateTime)) >= fromDate):true) ): [];
    const PendingRecords = allToken ? allToken.filter(tkn => tkn.state === "pending" && (fromDate!=null ? (toDate!=null ? formatDate(new Date(tkn.dateTime))>=fromDate && formatDate(new Date(tkn.dateTime))<=toDate:formatDate(new Date(tkn.dateTime)) >= fromDate):true) ): [];


    

    const handleDateChange = (date, name) => {
        let formattedDate = null;
        if (date !== null) {
            formattedDate = formatDate(date); // Format the date
        }
        if (name === "toDate") {
            console.log("To Date", formattedDate);
            setToDate(formattedDate);
        } else if (name === "fromDate") {
            console.log("From Date", formattedDate);
            setFromDate(formattedDate);
        }
    };
    

    

    return (
        <div className="phlebotomy-container">
            <div className="phlebotomy-left-container">
                <div className="pl-heading"><p>Search Visits</p></div>
                <div className="pl-select-options-container">
                    <div className="pl-select-options-main">
                        <div className="pl-select-date">

                            <div style={{ width: "70%", height: "2rem", display: "flex", alignItems: "center", borderBottom: "1px solid black", justifyContent: "space-between" }}>
                                <DatePicker
                                    className="custom-datepicker"
                                    placeholderText="From Date"
                                    selected={fromDate}
                                    onChange={(date) => handleDateChange(date, "fromDate")}
                                    dateFormat="MM/dd/yyyy"
                                    isClearable
                                    showYearDropdown
                                    ref={fromDatePickerRef}
                                />
                                <TbCalendarPlus style={{ marginLeft: "0.2rem", cursor: "pointer" }} onClick={() => fromDatePickerRef.current.setFocus()} />
                            </div>

                            <div style={{ width: "70%", height: "2rem", display: "flex", alignItems: "center", borderBottom: "1px solid black", justifyContent: "space-between" }}>
                                <DatePicker
                                    className="custom-datepicker"
                                    placeholderText="To Date"
                                    selected={toDate}
                                    onChange={(date) => handleDateChange(date, "toDate")}
                                    dateFormat="MM/dd/yyyy"
                                    isClearable
                                    showYearDropdown
                                    ref={toDatePickerRef}
                                />
                                <TbCalendarPlus style={{ marginLeft: "0.2rem", cursor: "pointer" }} onClick={() => toDatePickerRef.current.setFocus()} />
                            </div>


                            {/* <select
                                id="toDate"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                            >
                                {dateOptions.map((date) => (
                                    <option key={date} value={date}>
                                        {date}
                                    </option>
                                ))}
                            </select> */}
                            <select
                                id="phlebotomyType"
                                value={selectedOption}
                                onChange={handleOptionChange}
                            >
                                <option value="All Records">All Records</option>
                                <option value="Pending Records">Pending Phlebotomy</option>

                            </select>


                        </div>
                        <div className="pl-patient-container">
                            <div className="pl-patient-search">
                                <i className="fa fa-search"> <input type="text" placeholder="filter here" /></i>
                            </div>
                            {
                                selectedOption == "Pending Records" ? <p>Pending Records</p> : <p>All Records</p>
                            }
                            <div className="pl-patient-list-container">
                                <table className="pl-patient-list">
                                    <tbody>
                                        {selectedOption == "All Records" && AllRecords.map((data) => (
                                            <tr key={data._id}>
                                                <td onClick={() => handlePatientClick(data.patientData.pin)}>{data.patientData.pin}</td>
                                            </tr>
                                        ))}
                                        {selectedOption == "Pending Records" && PendingRecords.map((data) => (
                                            <tr key={data._id}>
                                                <td onClick={() => handlePatientClick(data.patientData.pin)}>{data.patientData.pin}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

            <div className="phlebotomy-right-container">
                <div className="pl-heading"><p>Visit Samples {selectedRegistrationDetails ? `(${selectedRegistrationDetails.patientData.pin})` : ""}</p></div>
                <div className="pr-patient-details-container">

                    {selectedRegistrationDetails && (
                        <div className="pr-patient-details">
                            <p style={{ fontWeight: '600', fontSize: '1rem' }}>{`${selectedRegistrationDetails.patientData.name} (${selectedRegistrationDetails.patientData.pin})`}</p>
                            <div className="patient-other-details">
                                <p>Age: {selectedRegistrationDetails.patientData.age}</p>
                                <p>Gender: {selectedRegistrationDetails.patientData.gender}</p>
                                <p>Contact: {selectedRegistrationDetails.patientData.mobileNumber}</p>
                            </div>
                            <p>Address: {selectedRegistrationDetails.patientData.address}</p>
                            <p>Refered BY: {selectedRegistrationDetails.patientData.refDoctor}</p>
                            <p>Date: {selectedRegistrationDetails.dateTime}</p>
                        </div>
                    )}
                    <div className="pr-test-details-container">
                        <div className="pr-test-heading-container">
                            <span></span>
                            <p className="pr-test-heading">{`Test of (PIN ${selectedRegistrationDetails ? selectedRegistrationDetails.patientData.pin : ''})`}</p>
                            <span></span>
                        </div>
                        <div className="pr-test-table-container">
                            <table className="pr-test-table">
                                <thead>
                                    <tr>
                                        <th>Code</th>
                                        <th>Name</th>
                                        <th>Sample</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedRegistrationDetails && selectedRegistrationDetails.tests.map(test => (
                                        <tr key={test._id}>
                                            <td>{test.code}</td>
                                            <td>{test.name}</td>
                                            <td>{test.sampleType}</td>
                                            <td>{test.sampleQuantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>


                        <div className="pr-test-heading-container">
                            <span></span>
                            <p style={{ marginLeft: '2.5rem', }} className="pr-test-heading">Visit Remarks</p>
                            <span></span>
                        </div>
                        <div className="pr-test-visit-remarks-container">
                            <textarea
                                rows='4'
                                cols='60'
                                placeholder="Enter visit remarks"
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                            />
                            <button onClick={handleAddRemark} style={selectedRegistrationDetails == null ? { display: "none" } : {}}>Save Remarks</button>
                        </div>
                        <div className="pr-buttons-container" style={selectedRegistrationDetails == null ? { display: "none" } : {}}>
                            <button onClick={handleTransferToPending}>Pending</button>
                            <button onClick={generateBarcodeAndSaveToPDF}>Print Barcode</button>
                            <div id="barcode" style={{ display: 'none' }}></div>
                            <button onClick={handleTransferData}>Transfer</button>

                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
export default Phlebotomy;