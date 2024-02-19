// Navbar.js
import React from 'react';
import "../../phelobotony/css/Navbar.css"
import { Link } from 'react-router-dom';


function Navbar() {
    return (
        <div className="navbar">
            <div className="right-section">
            <Link className="navbar-icon" to='login' >
                    Login
                </Link>
                <span className="navbar-icon profile-icon" style={{ backgroundImage: 'url(path_to_your_image)' }}>
                    {/* You can replace 'path_to_your_image' with the actual path to your image */}
                </span>
            </div>
        </div>
    );
}

export default Navbar;
