// Sidebar.js

import React, { useState, useEffect } from "react";
import "../CSS/Sidebar.css";

import { Link } from "react-router-dom";
import { faL } from "@fortawesome/free-solid-svg-icons";

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

  const [isReceptionistDropdownOpen, setReceptionistDropdownOpen] =
    useState(false);
  const [isPhlebotomyDropdownOpen, setPhlebotomyDropdownOpen] = useState(false);
  const [isRegistrationDropdownOpen, setRegistrationDropdownOpen] =
    useState(false);
  const [isTestReportsDropdownOpen, setTestReportsDropdownOpen] =
    useState(false);

  const handleRegistrationDropdownToggle = () => {
    setRegistrationDropdownOpen(!isRegistrationDropdownOpen);
    setTestReportsDropdownOpen(false); // Close other dropdown if open
  };

  const handleTestReportsDropdownToggle = () => {
    setTestReportsDropdownOpen(!isTestReportsDropdownOpen);
    setRegistrationDropdownOpen(false); // Close other dropdown if open
  };
  const handleReceptionistDropdownToggle = () => {
    setReceptionistDropdownOpen(!isReceptionistDropdownOpen);
    setPhlebotomyDropdownOpen(false);
  };

  const handlePhlebotomyDropdownToggle = () => {
    setPhlebotomyDropdownOpen(!isPhlebotomyDropdownOpen);
    setReceptionistDropdownOpen(false);
  };

  return (
    <div className="sidebar-container">
      {window.innerWidth > 1200 ? null : (
        <i
          className="fa fa-times crossSign"
          style={{ color: "white" }}
          onClick={handleCloseSign}
        ></i>
      )}
      <div className="sidenav">
        <span className="Heading-sidebar">LMS</span>

        <button
          className={`dropdown-btn ${
            isReceptionistDropdownOpen ? "active" : ""
          }`}
          onClick={handleReceptionistDropdownToggle}
        >
          <i className="fa fa-file-text"></i> Receptionist{" "}
          <i className="fa fa-caret-down"></i>
        </button>
        <div
          className={`dropdown-container ${
            isReceptionistDropdownOpen ? "open" : ""
          }`}
        >
          <Link
            to=""
            style={{ textDecoration: "none" }}
            onClick={handleLinkClick}
          >
            {" "}
            <p>
              <i className="fa fa-dashboard"></i> Dashboard
            </p>
          </Link>

          <button
            className={`dropdown-btn ${
              isRegistrationDropdownOpen ? "active" : ""
            }`}
            onClick={handleRegistrationDropdownToggle}
          >
            <i className="fa fa-user-plus"></i> Registrations{" "}
            <i className="fa fa-caret-down"></i>
          </button>
          <div
            className={`dropdown-container ${
              isRegistrationDropdownOpen ? "open" : ""
            }`}
          >
            <Link
              to="patient_registration"
              style={{ textDecoration: "none" }}
              onClick={handleLinkClick}
            >
              {" "}
              <p>Patient Registration</p>
            </Link>
            <Link
              to="SearchPatient"
              style={{ textDecoration: "none" }}
              onClick={handleLinkClick}
            >
              {" "}
              <p>Search Patient</p>
            </Link>
            <Link
              to="search_test"
              style={{ textDecoration: "none" }}
              onClick={handleLinkClick}
            >
              {" "}
              <p>Search Test</p>
            </Link>
          </div>

          <button
            className={`dropdown-btn ${
              isTestReportsDropdownOpen ? "active" : ""
            }`}
            onClick={handleTestReportsDropdownToggle}
          >
            <i className="fa fa-file-text"></i> Test Reports{" "}
            <i className="fa fa-caret-down"></i>
          </button>
          <div
            className={`dropdown-container ${
              isTestReportsDropdownOpen ? "open" : ""
            }`}
          >
            <Link
              to="view_test_report"
              style={{ textDecoration: "none" }}
              onClick={handleLinkClick}
            >
              <p>View Test Report</p>
            </Link>
            <Link
              to="search_test_report"
              style={{ textDecoration: "none" }}
              onClick={handleLinkClick}
            >
              <p>Search Test Report</p>
            </Link>
          </div>
        </div>

        <button
          className={`dropdown-btn ${
            isPhlebotomyDropdownOpen ? "active" : ""
          }`}
          onClick={handlePhlebotomyDropdownToggle}
        >
          <i className="fa fa-file-text"></i> Phlebotomy{" "}
          <i className="fa fa-caret-down"></i>
        </button>
        <div
          className={`dropdown-container ${
            isPhlebotomyDropdownOpen ? "open" : ""
          }`}
        >
          <div className="sidenav">
            <Link
              to="phlebotomy"
              style={{ textDecoration: "none" }}
              onClick={handleLinkClick}
            >
              {" "}
              <p>
                <i className="fa fa-user-md"></i> Phlebotomy
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className="version">Version 1.0</div>
    </div>
  );
}

export default Sidebar;
