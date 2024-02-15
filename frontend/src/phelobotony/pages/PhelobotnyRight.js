import React from "react";
import Navbar from "../component/Navbar";
import Dashboard from "./Dashboard";
import { Routes,Route } from "react-router";
import Phlebotomy from "./Phlebotomy";
import Report from "./Report";
const PhelobotnyRight=()=>{
    return(
        <div style={{ width: "auto", height: "100vh" }}>
       <Navbar />
        <div style={{  marginTop: "50px" }}>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/phlebotomy" element={<Phlebotomy />} />
                <Route path="/phlebotomy/Report" element={<Report />} />
            </Routes>
        </div>
        </div>
    )
}
export default PhelobotnyRight;