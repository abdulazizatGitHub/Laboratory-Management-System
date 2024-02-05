import React, { useState } from "react";
import '../css/ViewPatientDetail.css';
const ViewPatientDetail = () => {
    const [queryByPIN, setQueryByPIN] = useState('');
    const [queryByContact, setQueryByContact] = useState('');
    const [queryByCNIC, setQueryByCNIC] = useState('');

    const [patientData, setPatientData] = useState([
        { pin: '2401-00001', name: 'Abdul Aziz', conatctNo: '0300-0000000', CNIC: '15402-0000000-0'},
        { pin: '2401-00002', name: 'Abdul Aziz', conatctNo: '0300-0000000', CNIC: '15402-0000000-0'},
        { pin: '2401-00003', name: 'Abdul Aziz', conatctNo: '0300-0000000', CNIC: '15402-0000000-0'},
        { pin: '2401-00004', name: 'Abdul Aziz', conatctNo: '0300-0000000', CNIC: '15402-0000000-0'},
        { pin: '2401-00005', name: 'Abdul Aziz', conatctNo: '0300-0000000', CNIC: '15402-0000000-0'},
        { pin: '2401-00006', name: 'Abdul Aziz', conatctNo: '0300-0000000', CNIC: '15402-0000000-0'},
        { pin: '2401-00007', name: 'Abdul Aziz', conatctNo: '0300-0000000', CNIC: '15402-0000000-0'},
        { pin: '2401-00008', name: 'Abdul Aziz', conatctNo: '0300-0000000', CNIC: '15402-0000000-0'},
        { pin: '2401-00009', name: 'Abdul Aziz', conatctNo: '0300-0000000', CNIC: '15402-0000000-0'},
        { pin: '2401-00010', name: 'Abdul Aziz', conatctNo: '0300-0000000', CNIC: '15402-0000000-0'},
      ]);

    return (
        <div className="View-Patient-Details-Container">
            <div className="Search-Container">
                <p>Search Here</p>
                <div className="Search-Main">
                    <div className="Search-Content">
                        <label>Search By PIN</label>
                        <input type="text" name="search-by-pin" placeholder="Search" />
                    </div>
                    <div className="Search-Content">
                        <label>Search By Contact #</label>
                        <input type="text" name="search-by-contact" placeholder="Search" />
                    </div>
                    <div className="Search-Content">
                        <label>Search By CNIC</label>
                        <input type="text" name="search-by-cnic" placeholder="Search" />
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
                                patientData.map((data) => (
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