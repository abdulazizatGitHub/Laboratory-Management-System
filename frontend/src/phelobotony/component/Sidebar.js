import React, { useEffect } from "react";
import "../css/Sidebar.css";
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

  return (
    <div className="sidebar-container">

      { window.innerWidth > 1200 ? null :
        <i className="fa fa-times crossSign" style={{ color: "white" }} onClick={handleCloseSign}></i>
}
      <div className="sidenav">
        <span className="Heading-sidebar">LMS</span>

        <Link to="" style={{ textDecoration: "none" }} onClick={handleLinkClick}  >
          
          <p>
            <i className="fa fa-dashboard"></i> Dashboard
          </p>
        </Link>
        <Link to="phlebotomy" style={{ textDecoration: "none" }} onClick={handleLinkClick} >
          {" "}
          <p>
          <i className="fa fa-user-md"></i> Phlebotomy
          </p>
        </Link>
      </div>

      <div className="version1">Version 1.0</div>
    </div>
  );
}

export default Sidebar;