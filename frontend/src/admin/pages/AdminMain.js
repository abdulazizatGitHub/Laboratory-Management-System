import React from "react";
import "../css/AdminMain.css";
import Sidebar from "../components/Sidebar";
import AdminRight from "./AdminRight";


const AdminMain=()=>{
    return(
        <div id="mainContainer-admin">
           
            <div className="left-side-admin">
            <Sidebar />
            </div>
            <div className="right-side-admin">
            <AdminRight />
            </div>
        </div>
    )
}
export default AdminMain;