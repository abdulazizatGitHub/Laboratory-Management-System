import React, { useState, useEffect } from "react";
import '../css/ViewPatientDetail.css';
import { useNavigate } from "react-router-dom";
import { getStaffDetails } from "../../Services/API";
const ViewStaffRecord = () => {
    const [selectedField, setSelectedField] = useState("PIN");
    const [queryByShift, setQueryByShift] = useState('');
    const [queryByCNIC, setQueryByCNIC] = useState('');
    const navigation = useNavigate();
    const [staffData, setStaffData] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getStaffDetails();
                setStaffData(response.staffDetails);
                filteringData();
            } catch (error) {
                console.log('Error occurred in fetching the staff data');
            }
        }
    
        fetchData();
        
    }, []);

    const filteringData=()=>{
        const data = staffData.filter(d=> d._id != user._id);
        setStaffData(data);
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
        navigation('/admin/view-staff-record/staffDetail', { state: { data } });
    }

    if (staffData === null) {
        // Data is still being fetched, you can show a loading spinner or message
        return <div>Loading...</div>;
    }

    const filteredData = selectedField === "Shift"
        ? staffData.filter(data => data.shift.includes(queryByShift))
        : staffData.filter(data => data.cnic.includes(queryByCNIC)
        );

    return (
        <div className="View-Patient-Details-Container">
            <div className="Search-Container">
                <p>Staff Sales Report</p>
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
                    
                </div>
            </div>
            <div className="Scrolable-Table-Container">
                <table className="Scrolable-Table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Contact #</th>
                            <th>CNIC</th>
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