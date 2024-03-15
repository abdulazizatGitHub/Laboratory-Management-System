import React, { useState, useEffect } from "react";
import '../css/StaffReport.css';
import { useNavigate } from "react-router-dom";
import { getStaffByRole } from "../../Services/API";
import ReactLoading from 'react-loading';

const ViewStaffRecord = () => {
    const [selectedField, setSelectedField] = useState("PIN");
    const [queryByShift, setQueryByShift] = useState('');
    const [queryByCNIC, setQueryByCNIC] = useState('');
    const [receptionistData, setReceptionistData] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const navigation = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getStaffByRole();
                console.log('the role based data is: ', response.data);
                setReceptionistData(response.data);
                filteringData();
            } catch (error) {
                console.log('Error occurred in fetching the staff data');
            }
        }
    
        fetchData();
        
    }, []);

    const filteringData = () => {
        const data = receptionistData.filter(d => d._id !== user._id);
        setReceptionistData(data);
    }

    const handleFieldChange = (event) => {
        setSelectedField(event.target.value)
    }

    const handlePinChange = (event) => {
        const query = event.target.value;
        setQueryByShift(query)
    }

    const handlePinCnic = (event) => {
        const query = event.target.value;
        setQueryByCNIC(query)
    }

    const handleDetailView = (data) => {
        navigation('/admin/StaffReport/Detailstaff', { state: { data } });
    }

    if (receptionistData === null) {
        // Data is still being fetched, you can show a loading spinner or message
        return <div className="loader-container"> <ReactLoading type={"bars"} color={"#03fc4e"} height={100} width={100} /></div>;
    }

    const filteredData = selectedField === "Shift"
        ? receptionistData.filter(data => data.shift.includes(queryByShift))
        : receptionistData.filter(data => data.cnic.includes(queryByCNIC));

    return (
        <div className="View-Staff-Report-Container">
            <div className="Filter-Container">
                <p>Staff Sales Report</p>
                <div className="Filter-Main">
                    <div className="Filter-Content">
                        <label>Search By Shift</label>
                        <div className="ViewStaff-filter-input">
                            <input type="radio" value="Shift" checked={selectedField === 'Shift'} onChange={handleFieldChange} className="ViewStaff-filter-radio" />
                            <input type="text" name="search-by-shift" placeholder="Search" className="ViewStaff-filter-text" disabled={selectedField !== 'Shift'} onChange={handlePinChange} value={queryByShift} />
                        </div>
                    </div>
                    <div className="Filter-Content">
                        <label>Search By CNIC</label>
                        <div className="ViewStaff-filter-input">
                            <input type="radio" value="CNIC" checked={selectedField === 'CNIC'} onChange={handleFieldChange} className="ViewStaff-filter-radio" />
                            <input type="text" name="search-by-pin" placeholder="Search" className="ViewStaff-filter-text" disabled={selectedField !== 'CNIC'} onChange={handlePinCnic} value={queryByCNIC} />
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="StaffDetail-Table-Container">
                <table className="staffDetails-Table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Contact #</th>
                            <th>CNIC</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Shift</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredData.map((data) => (
                                <tr key={data._id}>
                                    <td>{data.name}</td>
                                    <td>{data.contactNumber}</td>
                                    <td>{data.cnic}</td>
                                    <td>{data.role}</td>
                                    <td>{data.shift}</td>
                                    <td>{data.shift}</td>   
                                    <td>
                                        <button type="button" id="ViewTestReport-roundButton" style={{cursor: 'pointer'}} onClick={() => handleDetailView(data)}>View</button>
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
