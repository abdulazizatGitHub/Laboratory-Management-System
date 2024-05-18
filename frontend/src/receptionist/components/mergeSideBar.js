import React, { useState } from "react";
import './sideBar.css';
import { SiAirtable } from "react-icons/si";
import { GiDrippingTube } from "react-icons/gi";
import { Link } from 'react-router-dom';

function SideBar() {
    const [activeIcon, setActiveIcon] = useState(null);

    return (
        <div className="SB-main">
            <Link 
                className={`SB-items ${activeIcon === 'airtable' ? 'active' : ''}`}
                onClick={() => setActiveIcon('airtable')}
                to="/airtable" // Assuming you have a route for this
            >
                <SiAirtable className="SB-icon" />
            </Link>
            <Link 
                className={`SB-items ${activeIcon === 'tube' ? 'active' : ''}`}
                onClick={() => setActiveIcon('tube')}
                to="/tube" // Assuming you have a route for this
            >
                <GiDrippingTube className="SB-icon" />
            </Link>
        </div>
    );
}

export default SideBar;
