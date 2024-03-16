import React from "react";
import Navbar from "../../phelobotony/component/Navbar";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import StaffRegistration from "./StaffRegistration";
import ViewStaffRecord from "./ViewStaffRecord";
import ViewPatientDetail from "./ViewPatientDetail";
import StaffReport from "./StaffReport";
import MonthlyReport from "./MonthlyReport";
import PatientDetailPage from "./PatientDetailPage";
import StaffDetailPage from "./StaffDetailPage";
import DetailStaff from "./Detailstaff";
import Addtest from "./Addtest";
import ChangePassword from "../../receptionist/pages/ChangePassword";
import Searchreciept from "./Searchreciept";

const AdminRight = ({setIsSideBar}) => {
    return (
        <div style={{ width: "100%"}}>
            <Navbar setIsSideBar={setIsSideBar} />
       <div style={{ marginTop: "50px" ,width:"auto"}}>
                <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/staff_registration" element={<StaffRegistration />} />
                    <Route path="/view-staff-record" element={<ViewStaffRecord />} />
                    <Route path="/view-staff-record/staffDetail" element={<StaffDetailPage />} />
                    <Route path="/view-patient-detail" element={<ViewPatientDetail />} />
                    <Route path="/view-patient-detail/patientDetail" element={<PatientDetailPage />} />
                    <Route path="/staff_report" element={<StaffReport  />} />
                    <Route path="/MonthlyReport" element={<MonthlyReport />} />
                    <Route path="/StaffReport/Detailstaff" element={<DetailStaff />} />
                    <Route path="/Addtest" element={<Addtest />} />
                    <Route path="/Change-password" element={<ChangePassword />} />
                    <Route path="/Searchreciept" element={<Searchreciept />} />

                </Routes>
            </div>
        </div>
    )
}

export default AdminRight;