import React, { useState, useEffect } from "react";
import '../css/Phlebotomy.css';
import { Link, useNavigate } from 'react-router-dom';
import { getTokenDetails } from "../../Services/API";
import Barcode from 'react-barcode';

const Phlebotomy = () => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [selectedOption, setSelectedOption] = useState('Phlebotomy');
    const [registrationDetails, setRegistrationDetails] = useState([]);
    const [selectedRegistrationDetails, setSelectedRegistrationDetails] = useState(null);
    const [remarks, setRemarks] = useState('');
    const navigation = useNavigate();

    useEffect(() => {
        const fetchTokenDetails = async () => {
            try {
                const response = await getTokenDetails();
                setRegistrationDetails(response.data);
                console.log('Token Details are: ', response.data);
            } catch (error) {
                console.log('Error occure in fetching the token data', error);
            }
        }

        fetchTokenDetails();
    }, []);

    useEffect(() => {
        // Set default "to" date to today in the format "YYYY-MM-DD"
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setToDate(formattedDate);

        // Set default "from" date to 10 days ago
        const tenDaysAgo = new Date();
        tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
        const formattedFromDate = tenDaysAgo.toISOString().split('T')[0];
        setFromDate(formattedFromDate);
    }, []);

    const dateOptions = Array.from({ length: 10 }, (_, index) => {
        const date = new Date();
        date.setDate(date.getDate() - index);
        return date.toISOString().split('T')[0];
    });

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handlePatientClick = (pin) => {
        // Find the selected patient from the registrationDetails array
        const selectedPatientData = registrationDetails.find(patient => patient.patientData.pin === pin);
        setSelectedRegistrationDetails(selectedPatientData);
        };

    const handleTransferData = () => {
        navigation('/phelobotny/phlebotomy/Report', {state: {selectedRegistrationDetails, remarks}});
    }

    return (
        <div className="phlebotomy-container">
            <div className="phlebotomy-left-container">
                <div className="pl-heading"><p>Search Visits</p></div>
                <div className="pl-select-options-container">
                    <div className="pl-select-options-main">
                        <div className="pl-select-date">
                            <select
                                id="fromDate"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                            >
                                {dateOptions.map((date) => (
                                    <option key={date} value={date}>
                                        {date}
                                    </option>
                                ))}
                            </select>
                            <select
                                id="toDate"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                            >
                                {dateOptions.map((date) => (
                                    <option key={date} value={date}>
                                        {date}
                                    </option>
                                ))}
                            </select>
                            <select
                                id="phlebotomyType"
                                value={selectedOption}
                                onChange={handleOptionChange}
                            >
                                <option value="Phlebotomy">Phlebotomy</option>
                                <option value="Pending Phlebotomy">Pending Phlebotomy</option>
                            </select>
                        </div>
                        <div className="pl-patient-container">
                            <div className="pl-patient-search">
                                <i className="fa fa-search"> <input type="text" placeholder="filter here" /></i>
                            </div>
                            <p>Total Records: </p>
                            <div className="pl-patient-list-container">
                                <table className="pl-patient-list">
                                    <tbody>
                                        {
                                            registrationDetails.map((data) => (
                                                <tr>
                                                    <td onClick={() => handlePatientClick(data.patientData.pin)}>{data.patientData.pin}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="phlebotomy-right-container">
                <div className="pl-heading"><p>Visit Samples {selectedRegistrationDetails ?`(${selectedRegistrationDetails.patientData.pin})`:""}</p></div>
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
                            <button>Save Remarks</button>
                        </div>
                        <div className="pr-buttons-container">
                            <button>Pending</button>
                            <button>Print Barcode</button>
                            <button onClick={handleTransferData}>Transfer</button>
                            {/* <Link to='/phelobotny/phlebotomy/Report' style={{ width: "100%" }}>
                                
                            </Link> */}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
export default Phlebotomy;