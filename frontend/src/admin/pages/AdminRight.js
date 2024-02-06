import React from "react";
import Navbar from "../components/Navbar";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import StaffRegistration from "./StaffRegistration";
import ViewStaffRecord from "./ViewStaffRecord";
import ViewPatientDetail from "./ViewPatientDetail";
import StaffReport from "./StaffReport";
import MonthlyReport from "./MonthlyReport";
import PatientDetailPage from "./PatientDetailPage";

const AdminRight = () => {
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <Navbar />
            <div style={{ marginTop: "50px" }}>
                <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/staff_registration" element={<StaffRegistration />} />
                    <Route path="/view-staff-record" element={<ViewStaffRecord />} />
                    <Route path="/view-patient-detail" element={<ViewPatientDetail />} />
                    <Route path="/view-patient-detail/patientDetail" element={<PatientDetailPage />} />
                    <Route path="/staff_report" element={<StaffReport />} />
                    <Route path="/monthly-report" element={<MonthlyReport />} />
                </Routes>
            </div>
        </div>
    )
}

export default AdminRight;