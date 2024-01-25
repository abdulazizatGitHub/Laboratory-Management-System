// Navbar.js
import React from 'react';
import '../CSS/Navbar.css';


function Navbar() {
    return (
        <div className="navbar">
            <div className="right-section">
                <span className="navbar-icon">
                  Login
                </span>
                <span className="navbar-icon profile-icon" style={{ backgroundImage: 'url(path_to_your_image)' }}>
                    {/* You can replace 'path_to_your_image' with the actual path to your image */}
                </span>
            </div>
        </div>
    );
}

export default Navbar;
