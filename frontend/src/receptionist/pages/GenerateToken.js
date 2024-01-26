import React from "react"
import "../CSS/GenerateToken.css"
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import NamingBar from "../components/NamingBar";

const GenerateToken = ()=>{
    return(
        <div className="generateToken-container">
        <Navbar />
        <Sidebar />
        <NamingBar name={"Dashboard"} />
    </div>)
}

export default GenerateToken;