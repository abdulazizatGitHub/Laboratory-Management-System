import React from "react";
import Sidebar from "../components/Sidebar";
import Right from "./Right";
import Navbar from "../components/Navbar";
import "../CSS/Main.css"
const Main=()=>{
    return(
        <div id="mainContainer-receptionist">
            
            <div className="left-side-recep">
            <Sidebar />
                
            </div>
            <div className="right-side-recep">
            <Right />
                
            </div>
        </div>
    )
}

export default Main;