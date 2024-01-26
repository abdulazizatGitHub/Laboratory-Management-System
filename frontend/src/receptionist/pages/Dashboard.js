// Dashboard.js
import React from "react";
import '../CSS/Dashboard.css';
import img1 from '../../Assessts/Images/Profile1.jpg';

const Dashboard = () => {
    return (
        <div className="Main-Container">
            <div className="Profile">
                <div className="Image-details">
                    <img src={img1} className="profile-image" />
                </div>

                <div className="Profile-details">
                    <div className="upper-profile">
                        <p className="bold-light">NAME</p>
                        <p>Mahad Khan</p>
                    </div>

                    <div className="lower-profile">
                        <p className="bold-light">FATHER NAME</p>
                        <p>Khan</p>
                    </div>
                </div>

                <div className="Middle-details">
                    <div className="Middle-upper-profile">
                        <p className="bold-light">GENDER</p>
                        <p>Male</p>
                    </div>

                    <div className="Middle-lower-profile">
                        <p className="bold-light">DATE OF BIRTH</p>
                        <p>Khan</p>
                    </div>
                </div>

                <div className="Last-details">
                    <div className="Last-upper-profile">
                        <p className="bold-light">CONTACT</p>
                        <p>065415151121</p>
                    </div>

                    <div className="Last-lower-profile">
                        <p className="bold-light">CNIC</p>
                        <p>16101-8233468-5</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
