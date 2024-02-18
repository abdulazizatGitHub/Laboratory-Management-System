import React from "react";
import { Route, Routes } from "react-router-dom";
import PatientRegistration from "./PatientRegistration";
import Dashboard from "./Dashboard";
import SearchTest from "./SearchTest";
import Navbar from "../components/Navbar";
import GenerateToken from "./GenerateToken";
import ViewTestReport from "./ViewTestReport";
import SearchTestReport from "./SearchTestReport"
import SearchPatient from "./SearchPatient";

const Right = () => {
  return (
    <div >
      <div>
        <Navbar />
        <div style={{  marginTop: "50px" }}>
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
          </Routes>
          
        </div>
      </div>
    </div>
  );
};

export default Right;
