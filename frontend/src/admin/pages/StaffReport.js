import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const StaffReport = () => {
    const navigation = useNavigate();

    const [staffData, setStaffData] = useState([
        { id: 1, name: 'John Doe', address: '123 Main St', cnic: '12345-67890-1234', todaySale: 500, status: 'Online', shift: 'Morning' },
        { id: 2, name: 'Jane Smith', address: '456 Elm St', cnic: '09876-54321-4321', todaySale: 700, status: 'Offline', shift: 'Evening' },
        // Add more staff data as needed
    ]);

    const handleDetailView = (data) => {
        navigation('/admin/StaffReport/Detailstaff', { state: { data } });
    };

    return (
        <div>
            <h2>All Staff Sales</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>CNIC</th>
                        <th>Today's Sale</th>
                        <th>Status</th>
                        <th>Shift</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {staffData.map((staff) => (
                        <tr key={staff.id}>
                            <td>{staff.name}</td>
                            <td>{staff.address}</td>
                            <td>{staff.cnic}</td>
                            <td>{staff.todaySale}</td>
                            <td>{staff.status}</td>
                            <td>{staff.shift}</td>
                            <td>
                                <button type="button" onClick={() => handleDetailView(staff)}>View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StaffReport;
