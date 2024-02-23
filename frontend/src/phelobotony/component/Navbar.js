import React from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import { FaLock, FaSignOutAlt } from "react-icons/fa"; // Import icons from Font Awesome
import { useAuth } from "../../Services/AuthContext";

function Navbar({ setIsSideBar }) {
    const { logout } = useAuth();
    const user = JSON.parse(localStorage.getItem('user'));
    
    const dataURItoBlob = (dataURI) => {
      if (typeof dataURI !== 'string') {
        console.error('dataURItoBlob expects a string argument');
        return null;
      }
  
      const data = dataURI.split(',')[1];
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const byteString = atob(data);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uint8Array = new Uint8Array(arrayBuffer);
  
      for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
      }
  
      return new Blob([uint8Array], { type: mimeString });
    }
  
    const imageBlob = dataURItoBlob(user.image.data);

    const handleClickNav = () => {
        setIsSideBar((prev) => !prev);
    };

    const handleLogout = () => {
        logout();
        console.log("The logout Performd",logout);
    };

    return (
        <div className="navbar">
            <i className="fa fa-bars" style={{ color: "white" }} onClick={handleClickNav}></i>

            <div className="right-section">
                <div className="dropdown">
                    <img
                        src={user.imageUrl || "https://via.placeholder.com/50x50.png?text=ML"}
                        alt="Profile"
                        className="round-icon"
                    />

                    <div className="dropdown-content">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img
                                src={user.imageUrl || "https://via.placeholder.com/50x50.png?text=ML"}
                                alt="Profile"
                                className="round-icon"
                            />
                            <div>
                                <p style={{ margin: 0 }}>{user.name}</p>
                                <p style={{ margin: 0, fontSize: '12px' }}>{user.role}</p>
                            </div>
                        </div>
                        <div className="horizontal-line"></div>
                        <div className="anchorTagFor">
                            <Link to="/change-password">
                                <FaLock /> Change Password
                            </Link>
                        </div>
                        <div className="horizontal-line"></div>
                        <div className="anchorTagFor">
                            <Link to="/" onClick={handleLogout}>
                                <FaSignOutAlt /> Sign out
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
