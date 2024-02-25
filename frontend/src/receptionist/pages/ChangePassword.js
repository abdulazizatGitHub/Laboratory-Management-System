import React, { useState } from "react";
import { changePassword } from "../../Services/API";
import "../CSS/ChangePassword.css";
function ChangePassword() {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("The User is ", user);
    const token = localStorage.getItem("token");
    console.log("The token is ", token);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            if (user.password == oldPassword) {
                
                const userData = { userId: user._id, newPassword };
                console.log("The Data is ", userData);
                await changePassword(userData, token);
                user.password = newPassword;
                alert("Password changed successfully"); // Show success message
            }
            else{
                alert("Failed to change password. Please try again."); // Show error message
        
            }
        } catch (error) {
            // console.error("Error changing password:", error);
            alert("Failed to change password. Please try again."); // Show error message
        }
    };

    return (
        <div id="ChangePasswordMain">
            <h2 id="MainHeading_CP"> Change Password</h2>
            <form onSubmit={handleChangePassword} id="form_CP">
                <div className="form_CP_div">
                    <label className="form-CP-label">Old Password:</label>
                    <input
                        style={{width:"60%"}}
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form_CP_div">
                    <label className="form-CP-label">New Password:</label>
                    <input
                    style={{width:"60%"}}
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="form-CP-btn" type="submit">Change Password</button>
            </form>
        </div>
    );
}

export default ChangePassword;
