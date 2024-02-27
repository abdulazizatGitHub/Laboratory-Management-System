import React, { useState, useEffect } from "react";
import '../css/Phlebotomy.css';
import { Link, useNavigate } from 'react-router-dom';
import { getGeneratedToken, getPendingPhlebotomyData, getTokenDetails, savePendingPhlebotomyData } from "../../Services/API";

const Phlebotomy = () => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [selectedOption, setSelectedOption] = useState('All Records'); // Set the default selected option
    const [registrationDetails, setRegistrationDetails] = useState([]);
    const [pendingPhlebotomy, setPendingPhlebotomy] = useState([]);
    const [selectedRegistrationDetails, setSelectedRegistrationDetails] = useState(null);
    const [remarks, setRemarks] = useState('');
    const navigation = useNavigate();
    //By basit
    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        const fetchTokenDetails = async () => {
            const res = await getGeneratedToken();
            console.log("res.data is ",res)
            try {
                const response = await getTokenDetails();
                setRegistrationDetails(response.data);
                setTokens(res.data);
            } catch (error) {
                console.log('Error occure in fetching the token data', error);
            }
        }
        fetchTokenDetails();
    }, []);


    // useEffect(() => {
    //     const fetchPendingData = async () => {
    //         if (selectedOption === 'Pending Phlebotomy') {
    //             try {
    //                 const response = await getPendingPhlebotomyData(); // Fetch pending phlebotomy data
    //                 setPendingPhlebotomy(response.data);
    //                 console.log('Pending Phlebotomy Data:', response.data);
    //             } catch (error) {
    //                 console.log('Error occurred while fetching pending phlebotomy data:', error);
    //             }
    //         }
    //     };

    //     fetchPendingData();
    // }, [selectedOption]);


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
        console.log("Target value: ", e.target.value);
        setSelectedOption(e.target.value);
    };

    const handlePatientClick = (pin) => {
        // Check if the selected patient is in the registrationDetails array
        let selectedPatientData = registrationDetails.find(patient => patient.patientData.pin === pin);

        // If the patient is not found in registrationDetails, check in pendingPhlebotomy
        if (!selectedPatientData) {
            selectedPatientData = pendingPhlebotomy.find(patient => patient.patientData.pin === pin);
        }

        setSelectedRegistrationDetails(selectedPatientData);
    };


    const handleTransferData = () => {
        navigation('/phelobotny/phlebotomy/Report', { state: { selectedRegistrationDetails, remarks } });
    }

    const handleTransferToPending = async () => {
        // Check if remarks field is empty
        if (!remarks) {
            console.error('Remarks field is required.');
            return;
        }

        // Save pending phlebotomy data to the backend API
        try {
            // Ensure that remarks are provided along with selectedRegistrationDetails
            // await savePendingPhlebotomyData({ ...selectedRegistrationDetails, remarks });
            // setPendingPhlebotomy([...pendingPhlebotomy, { ...selectedRegistrationDetails, remarks }]);
            // setRegistrationDetails(registrationDetails.filter(patient => patient.patientData.pin !== selectedRegistrationDetails.patientData.pin));
            // setSelectedRegistrationDetails(null);
        } catch (error) {
            console.error('Error occurred while saving pending phlebotomy data:', error);
        }
    };
    // const filteredRecords = selectedOption === 'Pending Phlebotomy' ? pendingPhlebotomy : registrationDetails;
    // const filteredTotalRecords = registrationDetails.filter(token => !pendingPhlebotomy.some(p => p.patientData.pin === token.patientData.pin));
    const AllRecords = tokens.filter(tkn => tkn.state == "generated");

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
                                <option value="All Records">All Records</option>
                                <option value="Pending Records">Pending Phlebotomy</option>
                                {/* {selectedOption === 'Pending Phlebotomy' ? (
                                    <option value="Pending Phlebotomy">Pending Phlebotomy</option>
                                ) : null} */}
                            </select>
                            {/* {filteredRecords?.map((data) => (
                                <tr key={data.patientData.pin}>
                                    <td onClick={() => handlePatientClick(data.patientData.pin)}>{data.patientData.pin}</td>
                                </tr>
                            ))} */}

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
                                        {AllRecords.map((data) => (
                                            <tr key={data._id}>
                                                <td >{data.tokenNumber}</td>
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
                            <button>Save Remarks</button>
                        </div>
                        <div className="pr-buttons-container">
                            <button onClick={handleTransferToPending}>Pending</button>
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
