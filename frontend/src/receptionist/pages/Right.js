import React from "react";
import { Route, Routes } from "react-router-dom";
import PatientRegistration from "./PatientRegistration";
import Dashboard from "./Dashboard";
import SearchTest from "./SearchTest";
import Navbar from "../../phelobotony/component/Navbar";
import GenerateToken from "./GenerateToken";
import ViewTestReport from "./ViewTestReport";
import SearchTestReport from "./SearchTestReport"
import SearchPatient from "./SearchPatient";
import ChangePassword from "./ChangePassword";
import ReportDetailsPage from "./ReportDetailsPage";

const Right = ({setIsSideBar}) => {
  return (
    
    <div style={{  width:"100%" }}>
       <Navbar setIsSideBar={setIsSideBar} />
        <div style={{  marginTop: "50px",width:"auto" }}>
             {/* Add a margin-top to create space for the Navbar */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/patient_registration"
              element={<PatientRegistration />}
            />
            <Route path="/search_test" element={<SearchTest />} />
            <Route path="/generate_token" element={<GenerateToken />} />
            <Route path="/view_test_report" element={<ViewTestReport />} />
            <Route path="/search_test_report" element={<SearchTestReport />} />
            <Route path="/SearchPatient" element={<SearchPatient />} />
            <Route path="/ChangedPassword" element={<ChangePassword />} />
            <Route path="/view_test_report/ReportDetailsPage" element={<ReportDetailsPage />} />
            <Route path="/search_test_report/ReportDetailsPage" element={<ReportDetailsPage />} />
            <Route path="/Change-password" element={<ChangePassword />} />
          </Routes>
          
        </div>
      </div>
    
  );
};

export default Right;
