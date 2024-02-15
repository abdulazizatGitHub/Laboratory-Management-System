// Sidebar.js

import React, { useState } from 'react';
import "../css/Sidebar.css";
import Navbar from './Navbar';

import { Link } from "react-router-dom";

function Sidebar() {

    const [isMobileScreen, setIsMobileScreen] = useState(false);

    return (
        <div className="sidebar-container">
            <div className="sidenav">
                <span className='Heading-sidebar'>LMS</span>


                <Link to="" style={{ textDecoration: 'none' }}> <p><i className="fa fa-dashboard"></i> Dashboard</p></Link>
                <Link to="phlebotomy" style={{ textDecoration: 'none' }}> <p><i class="fa-regular fa-microscope"></i> Phlebotomy</p></Link>

            </div>
        </div>
    );
}

export default Sidebar;
