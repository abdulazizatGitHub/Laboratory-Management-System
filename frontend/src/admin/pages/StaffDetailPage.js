import React, { useEffect, useState } from "react";
import "../css/PatientDetailPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { deleteStaffData, updateStaffData } from "../../Services/API";

const StaffDetailPage = () => {
    const navigation = useNavigate();
    const location = useLocation();
    const { data } = location.state;
    const [showPassword, setShowPassword] = useState(false);
    const [editedData, setEditedData] = useState(data); // State to hold edited data
    const [showEditModal, setShowEditModal] = useState(false);


    useEffect(() => {
        console.log("contact No: ", data);
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const delStaff=async()=>{
        const res=await deleteStaffData(data._id)
        alert(res.data);
        navigation('/admin/view-staff-record');
    }

    const handleEdit = () => {
        setShowEditModal(true);
    }

    const handleSave = async () => {
        // Call API to save edited data
        await updateStaffData(editedData);
        // Close modal
        setShowEditModal(false);
        // Reload the page to reflect the changes
        window.location.reload();
    }
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    return (
        <div id="patientDetailPage-Fullcontainer">
            <div id="pdp-nameAndButtons">
                <p id="pdp-name">Staff Detail</p>
                <button type="button" id="pdp-btn" onClick={handleEdit}>Edit</button>
                <button type="button" id="pdp-btn" onClick={delStaff}>Delete</button>
            </div>
            <div id="pdp-container">
                <p className="pdp-heading">Personal Detail</p>
                <div className="pdp-details">
                    <div className="pdp-subBoxes">
                        <p className="pdp-smallHeading">Name: </p>
                        <p>{data.name}</p>
                    </div>
                    <div className="pdp-subBoxes">
                        <p className="pdp-smallHeading">Father Name: </p>
                        <p>{data.fatherName}</p>
                    </div>
                    <div className="pdp-subBoxes">
                        <p className="pdp-smallHeading">Age: </p>
                        <p>{data.age}</p>
                    </div>
                    <div className="pdp-subBoxes">
                        <p className="pdp-smallHeading">Gender: </p>
                        <p>{data.gender}</p>
                    </div>
                    <div className="pdp-subBoxes">
                        <p className="pdp-smallHeading">Role: </p>
                        <p>{data.role}</p>
                    </div>
                    <div className="pdp-subBoxes">
                        <p className="pdp-smallHeading">Shift: </p>
                        <p>{data.shift}</p>
                    </div>
                </div>
                <p className="pdp-heading">Contact Detail</p>
                <div className="pdp-details">
                    <div className="pdp-subBoxes">
                        <p className="pdp-smallHeading">Contact#: </p>
                        <p>{data.contactNumber}</p>
                    </div>
                    <div className="pdp-subBoxes">
                        <p className="pdp-smallHeading">CNIC: </p>
                        <p>{data.cnic}</p>
                    </div>
                    <div className="pdp-subBoxes">
                        <p className="pdp-smallHeading">Address: </p>
                        <p>{data.address}</p>
                    </div>
                </div>
                <p className="pdp-heading">Registration Detail</p>
                <div className="pdp-details">
                    <div className="pdp-subBoxes">
                        <p className="pdp-smallHeading">User name: </p>
                        <p>{data.userName}</p>
                    </div>
                    <div className="pdp-subBoxes">
                        <p className="pdp-smallHeading">Password: </p>
                        <p className="pdp-passwordTxt">
                            {showPassword ? (
                                data.password
                            ) : (
                                <span style={{ whiteSpace: "pre" }}>
                                    {"*".repeat(data.password.length)}
                                </span>
                            )}
                            <button onClick={togglePasswordVisibility} className="eye-icon">
                                {showPassword ? (
                                    <FontAwesomeIcon icon={faEye} />
                                ) : (
                                    <FontAwesomeIcon icon={faEyeSlash} />
                                )}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
            {showEditModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowEditModal(false)}>&times;</span>
                        <h2>Edit Details</h2>
                        {/* Inputs for editing */}
                        <input type="text" name="name" value={editedData.name} onChange={handleChange} />
                        <input type="text" name="fatherName" value={editedData.fatherName} onChange={handleChange} />
                        <input type="number" name="age" value={editedData.age} onChange={handleChange} />
                        <input type="text" name="gender" value={editedData.gender} onChange={handleChange} />
                        <input type="text" name="role" value={editedData.role} onChange={handleChange} />
                        <input type="text" name="shift" value={editedData.shift} onChange={handleChange} />
                        <input type="text" name="contactNumber" value={editedData.contactNumber} onChange={handleChange} />
                        <input type="text" name="cnic" value={editedData.cnic} onChange={handleChange} />
                        <input type="text" name="address" value={editedData.address} onChange={handleChange} />
                        <input type="text" name="password" value={editedData.password} onChange={handleChange} />
                        <button onClick={handleSave}>Save</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StaffDetailPage;
