// Sidebar.js

import React, { useState } from 'react';
import "../../receptionist/CSS/Sidebar.css";

import { Link } from "react-router-dom";

function Sidebar() {
    const [isRegistrationDropdownOpen, setRegistrationDropdownOpen] = useState(false);
    const [isTestReportsDropdownOpen, setTestReportsDropdownOpen] = useState(false);

    const handleRegistrationDropdownToggle = () => {
        setRegistrationDropdownOpen(!isRegistrationDropdownOpen);
        setTestReportsDropdownOpen(false); // Close other dropdown if open
    };

    const handleTestReportsDropdownToggle = () => {
        setTestReportsDropdownOpen(!isTestReportsDropdownOpen);
        setRegistrationDropdownOpen(false); // Close other dropdown if open
    };

    return (
        <div className="sidebar-container">
        <div className="sidenav">
            <span className='Heading-sidebar'>LMS</span>

            
            <Link to="" style={{textDecoration:'none'}}> <p><i className="fa fa-dashboard"></i> Dashboard</p></Link>
                
            <button className={`dropdown-btn ${isRegistrationDropdownOpen ? 'active' : ''}`} onClick={handleRegistrationDropdownToggle}>
                <i className="fa fa-user-plus"></i> Registrations<i className="fa fa-caret-down"></i>
            </button>
            <div className={`dropdown-container ${isRegistrationDropdownOpen ? 'open' : ''}`}>
            <Link to="staff_registration" style={{textDecoration:'none'}}> <p>Staff Registration</p></Link>
            <Link to="view-staff-record" style={{textDecoration:'none'}}> <p>View Staff Record</p></Link>
            <Link to="view-patient-detail" style={{textDecoration:'none'}}> <p>View Patient Details</p></Link>
            <Link to="Addtest" style={{textDecoration:'none'}}> <p>Add Test Details</p></Link>
                
                
            </div>

            <button className={`dropdown-btn ${isTestReportsDropdownOpen ? 'active' : ''}`} onClick={handleTestReportsDropdownToggle}>
                <i className="fa fa-file-text"></i> Reports <i className="fa fa-caret-down"></i>
            </button>
            <div className={`dropdown-container ${isTestReportsDropdownOpen ? 'open' : ''}`}>
            <Link to="staff_report" style={{textDecoration:'none'}}><p>Staff Report</p></Link>
            <Link to="MonthlyReport" style={{textDecoration:'none'}}><p >Monthly Report</p></Link>
            </div>

            {/* <div className="version">Version 1.0</div> */}
            
        </div>
        </div>
    );
}

export default Sidebar;
