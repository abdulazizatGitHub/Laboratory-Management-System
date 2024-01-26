    // Dashboard.js
    import React from "react";
    import '../CSS/Dashboard.css';

    const Dashboard = () => {
        return (
            <div className="Main-Container">
         
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

                    <div className="Middle-details">
                        <div className="Middle-upper-profile">
                            <span>Name</span> <br></br>
                            <span>Hasnin Khan</span>
                        </div>

                        <div className="Middle-lower-profile">
                        <span>Father Name</span> <br></br>
                            <span>Khan</span>
                        </div>
                    </div>

                    <div className="Last-details">
                        <div className="Last-upper-profile">
                            <span>Name</span> <br></br>
                            <span>Mahad Khan</span>
                        </div>

                        <div className="Last-lower-profile">
                        <span>Father Name</span> <br></br>
                            <span>Khan</span>
                        </div>
                    </div>


                </div>
            </div>
        );
    }

    export default Dashboard;
