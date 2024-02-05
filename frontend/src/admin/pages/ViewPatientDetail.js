import React, { useState } from "react";
import '../css/ViewPatientDetail.css';
const ViewPatientDetail = () => {
    const [selectedField, setSelectedField] = useState("PIN");
    const [queryByPIN, setQueryByPIN] = useState('');
    const [queryByContact, setQueryByContact] = useState('');
    const [queryByCNIC, setQueryByCNIC] = useState('');

    const [patientData, setPatientData] = useState([
        { pin: '2401-00001', name: 'Abdul Aziz', conatctNo: '0300-0000000', CNIC: '15402-0000000-0' },
        { pin: '2401-00002', name: 'Abdul Aziz', conatctNo: '0300-0000000', CNIC: '15402-0000000-0' },
        { pin: '2401-00003', name: 'Abdul Aziz', conatctNo: '0300-0000000', CNIC: '15402-0000000-0' },
        { pin: '2401-00004', name: 'Abdul Aziz', conatctNo: '0300-0000000', CNIC: '15402-0000000-0' },
        { pin: '2401-00005', name: 'Abdul Aziz', conatctNo: '0300-0000000', CNIC: '15402-0000000-0' },
        { pin: '2401-00006', name: 'Abdul Aziz', conatctNo: '0300-0000000', CNIC: '15402-0000000-0' },
        { pin: '2401-00007', name: 'Abdul Aziz', conatctNo: '0300-0000000', CNIC: '15402-0000000-0' },
        { pin: '2401-00008', name: 'Abdul Aziz', conatctNo: '0300-0000000', CNIC: '15402-0000000-0' },
        { pin: '2401-00009', name: 'Abdul Aziz', conatctNo: '0300-0000000', CNIC: '15402-0000000-0' },
        { pin: '2401-00010', name: 'Abdul Aziz', conatctNo: '0300-0000000', CNIC: '15402-0000000-0' },
    ]);

    const handleFieldChange = (event) => {
        setSelectedField(event.target.value)
    }

    const handlePinChange=(event)=>{
        const query=event.target.value;
        setQueryByPIN(query)
    }

    const handlePinContact=(event)=>{
        const query=event.target.value;
        setQueryByPIN(query)
    }

    const handlePinCnic=(event)=>{
        const query=event.target.value;
        setQueryByPIN(query)
    }

    const filteredData = selectedField==="PIN"
    ? patientData.filter(data=>data.pin.includes(queryByPIN))
    : (selectedField==="Contact"
    ? patientData.filter(data=> data.conatctNo.includes(queryByContact))
    : patientData.filter(data => data.CNIC.includes(queryByCNIC))
    )

    return (
        <div className="View-Patient-Details-Container">
            <div className="Search-Container">
                <p>Search Here</p>
                <div className="Search-Main">
                    <div className="Search-Content">
                        <label>Search By PIN</label>
                        <div className="ViewPat-search-input">
                            <input type="radio" value="PIN" checked={selectedField === 'PIN'} onChange={handleFieldChange} className="ViewPat-search-radio" />
                            <input type="text" name="search-by-pin" placeholder="Search" className="ViewPat-search-text" disabled={selectedField !== 'PIN'} onChange={handlePinChange} value={queryByPIN}/>
                        </div>
                    </div>
                    <div className="Search-Content">
                        <label>Search By Contact #</label>
                        <div className="ViewPat-search-input">
                            <input type="radio" value="CONTACT" checked={selectedField === 'CONTACT'} onChange={handleFieldChange} className="ViewPat-search-radio" />
                            <input type="text" name="search-by-pin" placeholder="Search" className="ViewPat-search-text" disabled={selectedField !== 'CONTACT'} onChange={handlePinContact} value={queryByContact}/>
                        </div>
                    </div>
                    <div className="Search-Content">
                        <label>Search By CNIC</label>
                        <div className="ViewPat-search-input">
                            <input type="radio" value="CNIC" checked={selectedField === 'CNIC'} onChange={handleFieldChange} className="ViewPat-search-radio" />
                            <input type="text" name="search-by-pin" placeholder="Search" className="ViewPat-search-text" disabled={selectedField !== 'CNIC'} onChange={handlePinCnic} value={queryByCNIC}/>
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
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredData.map((data) => (
                                <tr>
                                    <td>{data.pin}</td>
                                    <td>{data.name}</td>
                                    <td>{data.conatctNo}</td>
                                    <td>{data.CNIC}</td>
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