// Sidebar.js

import React, { useState } from 'react';
import '../CSS/Sidebar.css';
import Navbar from './Navbar';

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
                <i className="fa fa-user-plus"></i> Registrations <i className="fa fa-caret-down"></i>
            </button>
            <div className={`dropdown-container ${isRegistrationDropdownOpen ? 'open' : ''}`}>
            <Link to="patient_registration" style={{textDecoration:'none'}}> <p>Patient Registration</p></Link>
            <Link to="search_test" style={{textDecoration:'none'}}> <p>Search Test</p></Link>
            <Link to="generate_token" style={{textDecoration:'none'}}> <p>Generate Token</p></Link>
                
                
            </div>

            <button className={`dropdown-btn ${isTestReportsDropdownOpen ? 'active' : ''}`} onClick={handleTestReportsDropdownToggle}>
                <i className="fa fa-file-text"></i> Test Reports <i className="fa fa-caret-down"></i>
            </button>
            <div className={`dropdown-container ${isTestReportsDropdownOpen ? 'open' : ''}`}>
            <Link to="view_test_report" style={{textDecoration:'none'}}><p>View Test Report</p></Link>
            <Link to="search_test_report" style={{textDecoration:'none'}}><p >Search Test Report</p></Link>
            </div>

            {/* <div className="version">Version 1.0</div> */}
            
        </div>
        </div>
    );
}

export default Sidebar;
