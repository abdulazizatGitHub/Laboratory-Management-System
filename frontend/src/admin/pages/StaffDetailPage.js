import React, { useEffect, useState } from "react";
import "../css/PatientDetailPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { deleteStaffData } from "../../Services/API";

const StaffDetailPage = () => {
    const navigation = useNavigate();
    const location = useLocation();
    const { data } = location.state;
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        console.log("contact No: ", data);
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const delStaff=async()=>{
        await deleteStaffData(data._id)
        navigation('/admin/view-staff-record');
    }

    return (<div id="patientDetailPage-Fullcontainer">
        <div id="pdp-nameAndButtons">
            <p id="pdp-name">Staff Detail</p>

            <button type="button" id="pdp-btn">Edit</button>
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

            <p className="pdp-heading">Registrtion Detail</p>
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
    </div>)
}
export default StaffDetailPage;