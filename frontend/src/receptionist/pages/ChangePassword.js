import React, { useState } from "react";
import { changePassword } from "../../Services/API";

function ChangePassword() {
    const [newPassword, setNewPassword] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            const userData = { userId: user.id, newPassword };
            await changePassword(userData, token);
            // Redirect or show success message
        } catch (error) {
            // Handle error
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
