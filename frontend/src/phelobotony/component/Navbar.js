import React from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import { FaLock, FaSignOutAlt } from "react-icons/fa"; // Import icons from Font Awesome

function Navbar({ setIsSideBar }) {
  const handleClickNav = () => {
    setIsSideBar((prev) => !prev);
  };

  return (
    <div className="navbar">
      <i className="fa fa-bars" style={{ color: "white" }} onClick={handleClickNav}></i>

      <div className="right-section">
        <div className="dropdown">
          <img
            src="https://via.placeholder.com/50x50.png?text=ML"
            alt="Profile"
            className="round-icon"
          />

          <div className="dropdown-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src="https://via.placeholder.com/50x50.png?text=ML"
                alt="Profile"
                className="round-icon"
              />
              <div>
                <p style={{ margin: 0 }}>Mahad Khan</p>
                <p style={{ margin: 0, fontSize: '12px' }}>mk-hr613</p>
              </div>
            </div>
            <div className="horizontal-line"></div>
            <Link to="/change-password">
              <FaLock /> Change Password
            </Link>
            <div className="horizontal-line"></div>
            <Link to="/sign-out">
              <FaSignOutAlt /> Sign out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
