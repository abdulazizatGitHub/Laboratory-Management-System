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
            const userData = { userId: user._id, newPassword }; // Correct the key to userId
            console.log("The Data is ", userData);
            await changePassword(userData, token); // Pass token as argument
            // Redirect or show success message
        } catch (error) {
            console.error("error in happen ",error);
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
