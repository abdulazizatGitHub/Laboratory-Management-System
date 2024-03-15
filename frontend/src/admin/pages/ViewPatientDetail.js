import React, { useState, useEffect } from "react";
import '../css/ViewPatientDetail.css';
import { useNavigate } from "react-router-dom";
import { getPatientDetails } from "../../Services/API";
import ReactLoading from 'react-loading';

const ViewPatientDetail = () => {
    const [selectedField, setSelectedField] = useState("PIN");
    const [queryByPIN, setQueryByPIN] = useState('');
    const [queryByContact, setQueryByContact] = useState('');
    const [queryByCNIC, setQueryByCNIC] = useState('');
    const navigation = useNavigate();
    const [patientData, setPatientData] = useState([]);
    const [loading, setLoading] = useState(false); // Add loading state

    useEffect(() => {
        fetchPatientData();
    }, []);

    const fetchPatientData = async () => {
        setLoading(true); // Start loading when fetching data
        try {
            const data = await getPatientDetails();
            setPatientData(data);
        } catch (error) {
            console.error('Error fetching patient data:', error);
        } finally {
            setLoading(false); // Stop loading
        }
    }

    const handleFieldChange = (event) => {
        setSelectedField(event.target.value)
    }

    const handlePinChange = (event) => {
        const query = event.target.value;
        setQueryByPIN(query)
    }

    const handlePinContact = (event) => {
        const query = event.target.value;
        setQueryByContact(query)
    }

    const handlePinCnic = (event) => {
        const query = event.target.value;
        setQueryByCNIC(query)
    }

    const handleDetailView = (data) => {
        navigation('/admin/view-patient-detail/patientDetail', { state: { data } });
    }

    const filteredData = selectedField === "PIN"
        ? patientData.filter(data => data.pin.includes(queryByPIN))
        : (selectedField === "CONTACT"
            ? patientData.filter(data => data.mobileNumber.includes(queryByContact))
            : patientData.filter(data => data.cnic.includes(queryByCNIC))
        )

    if (loading) {
        return <div className="loader-container"> <ReactLoading type={"bars"} color={"#03fc4e"} height={100} width={100} /></div>;
    }


    return (
        <div className="View-Patient-Details-Container">
            <div className="Search-Container">
                <p>Search Here</p>
                <div className="Search-Main">
                    <div className="Search-Content">
                        <label>Search By PIN</label>
                        <div className="ViewPat-search-input">
                            <input type="radio" value="PIN" checked={selectedField === 'PIN'} onChange={handleFieldChange} className="ViewPat-search-radio" />
                            <input type="text" name="search-by-pin" placeholder="Search" className="ViewPat-search-text" disabled={selectedField !== 'PIN'} onChange={handlePinChange} value={queryByPIN} />
                        </div>
                    </div>
                    <div className="Search-Content">
                        <label>Search By Contact #</label>
                        <div className="ViewPat-search-input">
                            <input type="radio" value="CONTACT" checked={selectedField === 'CONTACT'} onChange={handleFieldChange} className="ViewPat-search-radio" />
                            <input type="text" name="search-by-pin" placeholder="Search" className="ViewPat-search-text" disabled={selectedField !== 'CONTACT'} onChange={handlePinContact} value={queryByContact} />
                        </div>
                    </div>
                    <div className="Search-Content">
                        <label>Search By CNIC</label>
                        <div className="ViewPat-search-input">
                            <input type="radio" value="CNIC" checked={selectedField === 'CNIC'} onChange={handleFieldChange} className="ViewPat-search-radio" />
                            <input type="text" name="search-by-pin" placeholder="Search" className="ViewPat-search-text" disabled={selectedField !== 'CNIC'} onChange={handlePinCnic} value={queryByCNIC} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="Scrolable-Table-Container">
                <table className="Scrolable-Table">
                    <thead>
                        <tr>
                            <th>PIN</th>
                            <th>Name</th>
                            <th>Contact #</th>
                            <th>CNIC</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredData.map((data) => (
                                <tr>
                                    <td>{data.pin}</td>
                                    <td>{data.name}</td>
                                    <td>{data.mobileNumber}</td>
                                    <td>{data.cnic}</td>
                                    <td>
                                        <button type="button" id="ViewTestReport-roundButton" onClick={() => handleDetailView(data)}>View</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default ViewPatientDetail;