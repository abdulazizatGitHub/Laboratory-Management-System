    // Dashboard.js
    import React from "react";
    import Sidebar from "../components/Sidebar";
    import '../CSS/Dashboard.css';
import NamingBar from "../components/NamingBar";

    const Dashboard = () => {
        return (
            <div>
                <NamingBar name={"Dashboard"} />
                <div className="Profile">
                    <div className="Image-details">
                    <img src=".." className="profile-image" />

                    </div>

                    <div className="Profile-details">
                        <div className="upper-profile">
                            <span>Name</span> <br></br>
                            <span>Mahad Khan</span>
                        </div>

                        <div className="lower-profile">
                        <span>Father Name</span> <br></br>
                            <span>Khan</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    export default Dashboard;
