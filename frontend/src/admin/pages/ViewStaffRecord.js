import React, { useState } from "react";
import '../css/ViewPatientDetail.css';
import { useNavigate } from "react-router-dom";
const ViewStaffRecord  = () => {
    const [selectedField, setSelectedField] = useState("PIN");
    const [queryByShift, setQueryByShift] = useState('');
    const [queryByContact, setQueryByContact] = useState('');
    const [queryByCNIC, setQueryByCNIC] = useState('');
    const navigation = useNavigate();
    const [patientData, setPatientData] = useState([
        {name: 'Abdul Aziz', contactNo: '0310-0000000', CNIC: '15402-0000000-0' , shift:"Morning"},
        {name: 'Mahad Wajid', contactNo: '0320-0000000', CNIC: '15412-0000000-0' , shift:"Afternoon"},
        {name: 'Waleed Rashid', contactNo: '0330-0000000', CNIC: '15422-0000000-0' , shift:"Evening"},
        {name: 'Noman Khan', contactNo: '0340-0000000', CNIC: '15432-0000000-0' , shift:"Morning"},
        {name: 'Raza Bukhari', contactNo: '0350-0000000', CNIC: '15442-0000000-0' , shift:"Night"},
        {name: 'Imran Khan', contactNo: '0360-0000000', CNIC: '15452-0000000-0' , shift:"Evening"},
        {name: 'Nawaz Sharif', contactNo: '0370-0000000', CNIC: '15462-0000000-0' , shift:"Morning"},
        {name: 'Zulfiqar ali', contactNo: '0380-0000000', CNIC: '15472-0000000-0' , shift:"Night"},
        {name: 'Anas Bukhari', contactNo: '0390-0000000', CNIC: '15482-0000000-0', shift:"Afternoon" },
        {name: 'Shahid Khan', contactNo: '0301-0000000', CNIC: '15492-0000000-0', shift:"Morning" },
    ]);

    const handleFieldChange = (event) => {
        setSelectedField(event.target.value)
    }

    const handlePinChange = (event) => {
        const query = event.target.value;
        setQueryByShift(query)
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
        navigation('/admin/view-staff-record/staffDetail', { state: { data } });
    }

    const filteredData = selectedField === "Shift"
        ? patientData.filter(data => data.shift.includes(queryByShift))
        : (selectedField === "CONTACT"
            ? patientData.filter(data => data.contactNo.includes(queryByContact))
            : patientData.filter(data => data.CNIC.includes(queryByCNIC))
        )



    return (
        <div className="View-Patient-Details-Container">
            <div className="Search-Container">
                <p>Search Here</p>
                <div className="Search-Main">
                    <div className="Search-Content">
                        <label>Search By Shift</label>
                        <div className="ViewPat-search-input">
                            <input type="radio" value="Shift" checked={selectedField === 'Shift'} onChange={handleFieldChange} className="ViewPat-search-radio" />
                            <input type="text" name="search-by-shift" placeholder="Search" className="ViewPat-search-text" disabled={selectedField !== 'Shift'} onChange={handlePinChange} value={queryByShift} />
                        </div>
                    </div>
                    <div className="Search-Content">
                        <label>Search By CNIC</label>
                        <div className="ViewPat-search-input">
                            <input type="radio" value="CNIC" checked={selectedField === 'CNIC'} onChange={handleFieldChange} className="ViewPat-search-radio" />
                            <input type="text" name="search-by-pin" placeholder="Search" className="ViewPat-search-text" disabled={selectedField !== 'CNIC'} onChange={handlePinCnic} value={queryByCNIC} />
                        </div>
                    </div>
                    <div className="Search-Content">
                        <label>Search By Contact #</label>
                        <div className="ViewPat-search-input">
                            <input type="radio" value="CONTACT" checked={selectedField === 'CONTACT'} onChange={handleFieldChange} className="ViewPat-search-radio" />
                            <input type="text" name="search-by-pin" placeholder="Search" className="ViewPat-search-text" disabled={selectedField !== 'CONTACT'} onChange={handlePinContact} value={queryByContact} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="Scrolable-Table-Container">
                <table className="Scrolable-Table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Contact #</th>
                            <th>CNIC</th>
                            <th>Shift</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredData.map((data) => (
                                <tr>
                                    <td>{data.name}</td>
                                    <td>{data.contactNo}</td>
                                    <td>{data.CNIC}</td>
                                    <td>{data.shift}</td>
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
export default ViewStaffRecord;