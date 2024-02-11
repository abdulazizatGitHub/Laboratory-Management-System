// Sidebar.js

import React, { useState } from 'react';
import "../css/Sidebar.css";
import Navbar from './Navbar';

import { Link } from "react-router-dom";

function Sidebar() {


    return (
        <div className="sidebar-container">
            <div className="sidenav">
                <span className='Heading-sidebar'>LMS</span>


                <Link to="" style={{ textDecoration: 'none' }}> <p><i className="fa fa-dashboard"></i> Dashboard</p></Link>


            </div>
        </div>
    );
}

export default Sidebar;
