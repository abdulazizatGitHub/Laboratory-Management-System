import React, { useEffect, useState } from "react";
import "../css/PatientDetailPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { deleteStaffData, updateStaffData } from "../../Services/API";
import ReactLoading from 'react-loading';

const StaffDetailPage = () => {
    const navigation = useNavigate();
    const location = useLocation();
    const { data } = location.state;
    const [showPassword, setShowPassword] = useState(false);
    const [editedData, setEditedData] = useState(data); // State to hold edited data
    const [showEditModal, setShowEditModal] = useState(false);
    const [loading, setLoading] = useState(false); // Add loading state

    useEffect(() => {
        console.log("contact No: ", data);
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const delStaff = async () => {
        setLoading(true);
        try {
            const res = await deleteStaffData(data._id);
            alert(res.data);
            navigation('/admin/view-staff-record');
        } catch (error) {
            console.error('Error deleting staff:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleEdit = () => {
        setShowEditModal(true);
    }

    const handleSave = async () => {
        setLoading(true);
        try {
            // Call API to save edited data
            await updateStaffData(editedData);
            // Close modal
            setShowEditModal(false);
            // Reload the page to reflect the changes
            window.location.reload();
        } catch (error) {
            console.error('Error updating staff data:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    if (loading) {
        return <div className="loader-container"> <ReactLoading type={"bars"} color={"#03fc4e"} height={100} width={100} /></div>;
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
                        <div id="edit-divss">
                     <div className="edit-divs-each-input"> <label>Name : </label>  <input type="text" name="name" value={editedData.name} onChange={handleChange} /></div>
                     <div className="edit-divs-each-input"> <label>Father : </label><input type="text" name="fatherName" value={editedData.fatherName} onChange={handleChange} /></div>
                     <div className="edit-divs-each-input">  <label>Age : </label> <input type="number" name="age" value={editedData.age} onChange={handleChange} /></div>
                     <div className="edit-divs-each-input">
                                <label>Gender : </label>
                                <select name="gender" value={editedData.gender} onChange={handleChange}>
                                    <option value="Male">Male</option>
                                    <option value="Male">Female</option>
                                </select>
                            </div>
                            <div className="edit-divs-each-input">
                                <label>Role : </label>
                                <select name="role" value={editedData.role} onChange={handleChange}>
                                <option value="Admin">Admin</option>
                                <option value="Receptionist">Receptionist</option>
                                <option value="Phlebotomy">Phlebotomy</option>
                                </select>
                            </div>
                     <div className="edit-divs-each-input">  <label>Shift : </label> <input type="text" name="shift" value={editedData.shift} onChange={handleChange} /></div>
                     <div className="edit-divs-each-input">   <label>Contact : </label><input type="text" name="contactNumber" value={editedData.contactNumber} onChange={handleChange} /></div>
                     <div className="edit-divs-each-input">  <label>CNIC : </label> <input type="text" name="cnic" value={editedData.cnic} onChange={handleChange} /></div>
                     <div className="edit-divs-each-input">  <label>Address : </label> <input type="text" name="address" value={editedData.address} onChange={handleChange} /></div>
                     <div className="edit-divs-each-input">  <label>Password : </label> <input type="text" name="password" value={editedData.password} onChange={handleChange} /></div>
                        <button onClick={handleSave}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StaffDetailPage;
