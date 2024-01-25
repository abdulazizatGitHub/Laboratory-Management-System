// Sidebar.js

import React, { useState } from 'react';
import '../CSS/Sidebar.css';

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
        <div className="sidenav">
            <span className='Heading-sidebar'>LMS</span>

            <a href="#about">
                <i className="fa fa-dashboard"></i> Dashboard
            </a>

            <button className={`dropdown-btn ${isRegistrationDropdownOpen ? 'active' : ''}`} onClick={handleRegistrationDropdownToggle}>
                <i className="fa fa-user-plus"></i> Registrations <i className="fa fa-caret-down"></i>
            </button>
            <div className={`dropdown-container ${isRegistrationDropdownOpen ? 'open' : ''}`}>
                <a href="#">Patient Registration</a>
                <a href="#">Search Test</a>
            </div>

            <button className={`dropdown-btn ${isTestReportsDropdownOpen ? 'active' : ''}`} onClick={handleTestReportsDropdownToggle}>
                <i className="fa fa-file-text"></i> Test Reports <i className="fa fa-caret-down"></i>
            </button>
            <div className={`dropdown-container ${isTestReportsDropdownOpen ? 'open' : ''}`}>
                <a href="#">Patient Registration</a>
                <a href="#">Search Test</a>
            </div>

            <div className="version">Version 1.0</div>
        </div>
    );
}

export default Sidebar;
