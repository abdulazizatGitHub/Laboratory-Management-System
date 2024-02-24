import React from "react";
import Navbar from "../component/Navbar";
import Dashboard from "./Dashboard";
import { Routes,Route } from "react-router-dom";
import Phlebotomy from "./Phlebotomy";
import Report from "./Report";
import ChangePassword from "../../receptionist/pages/ChangePassword";

const PhelobotnyRight=({setIsSideBar})=>{
    return(
        <div style={{  width:"100%" }}>
       <Navbar setIsSideBar={setIsSideBar} />
        <div style={{  marginTop: "50px",width:"auto" }}>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/phlebotomy" element={<Phlebotomy />} />
                <Route path="/phlebotomy/Report" element={<Report />} />
                <Route path="/Change-password" element={<ChangePassword />} />

            </Routes>
        </div>
        </div>
    )
}
export default PhelobotnyRight;