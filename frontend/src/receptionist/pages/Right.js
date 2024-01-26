import React from "react";
import { Route, Routes } from "react-router-dom";
import PatientRegistration from "./PatientRegistration";
import Dashboard from "./Dashboard";
import SearchTest from "./SearchTest";
import Navbar from "../components/Navbar";

const Right = () => {
  return (
    <>
      <div>
        <Navbar />
        <div style={{ backgroundColor: "red", marginTop: "50px" }}>
          {/* Add a margin-top to create space for the Navbar */}
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/patient_registration"
              element={<PatientRegistration />}
            />
            <Route path="/search_test" element={<SearchTest />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Right;
