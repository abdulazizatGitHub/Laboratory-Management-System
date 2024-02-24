import React, { useState } from "react";
import { changePassword } from "../../Services/API";

function ChangePassword() {
    const [newPassword, setNewPassword] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("The User is ", user);
    const token = localStorage.getItem("token");
    console.log("The token is ",token);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            const userData = { userId: user._id, newPassword };
            console.log("The Data is ", userData);
            await changePassword(userData, token);
            alert("Password changed successfully"); // Show success message
        } catch (error) {
            console.error("Error changing password:", error);
            alert("Failed to change password. Please try again."); // Show error message
        }
    };

    return (
        <div>
            <h2>Change Password</h2>
            <form onSubmit={handleChangePassword}>
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
}

export default ChangePassword;
