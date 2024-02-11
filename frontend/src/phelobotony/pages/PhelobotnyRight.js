import React from "react";
import Navbar from "../component/Navbar";
import Dashboard from "./Dashboard";
import { Routes,Route } from "react-router";
import Phlebotomy from "./Phlebotomy";
const PhelobotnyRight=()=>{
    return(
        <div>
        <Navbar />
        <div style={{  marginTop: "50px" }}>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/phlebotomy" element={<Phlebotomy />} />
            </Routes>
        </div>
        </div>
    )
}
export default PhelobotnyRight;