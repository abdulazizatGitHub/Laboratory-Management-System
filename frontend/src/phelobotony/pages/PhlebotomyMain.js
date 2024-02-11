import React from "react";
import Sidebar from "../component/Sidebar";
import PhelobotnyRight from "./PhelobotnyRight";


const PhlebotomyMain=()=>{
    return(
        <div id="mainContainer-receptionist">
            
        <div className="left-side-recep">
        <Sidebar />
            
        </div>
        <div className="right-side-recep">
        <PhelobotnyRight />
            
        </div>
    </div>
    )
}
export default PhlebotomyMain;