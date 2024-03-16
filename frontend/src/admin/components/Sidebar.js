import React, { useState, useEffect } from 'react';
import "../../receptionist/CSS/Sidebar.css";

import { Link } from "react-router-dom";

function Sidebar({ setIsSideBar }) {
    const handleCloseSign = () => {
        setIsSideBar(false);
    };
    const handleLinkClick = () => {
        if (window.innerWidth < 1200) {
            setIsSideBar(false);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;
            if (windowWidth >= 1200) {
                setIsSideBar(true);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [setIsSideBar]);

    const [isRegistrationDropdownOpen, setRegistrationDropdownOpen] = useState(false);
    const [isTestReportsDropdownOpen, setTestReportsDropdownOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleRegistrationDropdownToggle = () => {
        setRegistrationDropdownOpen(!isRegistrationDropdownOpen);
        setTestReportsDropdownOpen(false); // Close other dropdown if open
        setActiveDropdown('registration');
    };

    const handleTestReportsDropdownToggle = () => {
        setTestReportsDropdownOpen(!isTestReportsDropdownOpen);
        setRegistrationDropdownOpen(false); // Close other dropdown if open
        setActiveDropdown('testReports');
    };

    return (
        <div className="sidebar-container">
            {window.innerWidth > 1200 ? null :
                <i className="fa fa-times crossSign" style={{ color: "white" }} onClick={handleCloseSign}></i>
            }
            <div className="sidenav">
                <span className='Heading-sidebar'>LMS</span>
                <Link to="" style={{ textDecoration: 'none' }} onClick={handleLinkClick} ><p><i className="fa fa-dashboard"></i> Dashboard</p></Link>

                <button className={`dropdown-btn ${activeDropdown === 'registration' ? 'active highlighted' : ''}`} onClick={handleRegistrationDropdownToggle}>
                    <i className="fa fa-user-plus"></i> Registrations <i className="fa fa-caret-down"></i>
                </button>
                <div className={`dropdown-container ${isRegistrationDropdownOpen ? 'open' : ''}`}>
                    <Link to="staff_registration" style={{ textDecoration: 'none' }} onClick={handleLinkClick} ><p>Staff Registration</p></Link>
                    <Link to="view-staff-record"  style={{ textDecoration: 'none' }} onClick={handleLinkClick} ><p>View Staff Record</p></Link>
                    <Link to="view-patient-detail" style={{ textDecoration: 'none' }} onClick={handleLinkClick} ><p>View Patient Details</p></Link>
                    <Link to="Addtest" style={{ textDecoration: 'none' }} onClick={handleLinkClick} ><p>Add Test Details</p></Link>
                    <Link to="Searchreciept" style={{ textDecoration: 'none' }} onClick={handleLinkClick} ><p>Search Reciept</p></Link>
                </div>

                <button className={`dropdown-btn ${activeDropdown === 'testReports' ? 'active highlighted' : ''}`} onClick={handleTestReportsDropdownToggle}>
                    <i className="fa fa-file-text"></i> Reports <i className="fa fa-caret-down"></i>
                </button>
                <div className={`dropdown-container ${isTestReportsDropdownOpen ? 'open' : ''}`}>
                    <Link to="staff_report" style={{ textDecoration: 'none' }} onClick={handleLinkClick} ><p>Staff Report</p></Link>
                    <Link to="MonthlyReport" style={{ textDecoration: 'none' }} onClick={handleLinkClick} ><p >Monthly Report</p></Link>
                </div>
            </div>
            <div className="version">Version 1.0</div>
        </div>
    );
}

export default Sidebar;
