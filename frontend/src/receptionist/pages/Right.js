import React from "react";
import { Route, Routes } from "react-router-dom";
import PatientRegistration from "./PatientRegistration";
import Dashboard from "./Dashboard";
import SearchTest from "./SearchTest";
import Navbar from "../components/Navbar";
import GenerateToken from "./GenerateToken";

const Right = () => {
  return (
    <div >
      <div>
        <Navbar />
        <div style={{  marginTop: "50px" }}>
          {/* Add a margin-top to create space for the Navbar */}
          <Routes>
            <Route path="/*" element={<Dashboard />} />
            <Route
              path="/patient_registration"
              element={<PatientRegistration />}
            />
            <Route path="/search_test" element={<SearchTest />} />
            <Route path="/generate_token" element={<GenerateToken />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Right;
