import React, { useEffect , useState } from "react";
import "../css/PatientDetailPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { deletePatData, updatePatData } from "../../Services/API";

const PatientDetailPage = () => {
    const navigation = useNavigate();
    const location = useLocation();
    const { data } = location.state;

      // State for managing edit mode and edited patient data
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(data);

    useEffect(() => {
        console.log("contact No: ", data);
    }, []);
    
        // Toggle edit mode
    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({
            ...editedData,
            [name]: value
        });
    };

    // Save edited data to the database
    const saveEditedData = async () => {
        // Call API to update patient data
        const res = await updatePatData(editedData);
        alert(res.data);
        // Navigate back to patient detail page or refresh the page to reflect changes
        navigation('/admin/view-patient-detail');
    };

    const delPat=async()=>{
        const res = await deletePatData(data._id)
        alert(res.data);
        navigation('/admin/view-patient-detail');
    }



    return (<div id="patientDetailPage-Fullcontainer">
       <div id="pdp-nameAndButtons">
                <p id="pdp-name">Patient Detail</p>
                {isEditing ? (
                    <>
                        <button type="button" id="pdp-btn" onClick={saveEditedData}>Save</button>
                        <button type="button" id="pdp-btn" onClick={toggleEditMode}>Cancel</button>
                    </>
                ) : (
                    <button type="button" id="pdp-btn" onClick={toggleEditMode}>Edit</button>
                )}
                <button type="button" id="pdp-btn" onClick={delPat}>Delete</button>
            </div>
        <div id="pdp-container">
        {isEditing ? (
                    <>
                        
                        <input
                        type="text"
                        className="pdp-input"
                        name="name"
                        value={editedData.name}
                        onChange={handleInputChange}
                    />
                        <input
                            type="text"
                            name="fatherName"
                            value={editedData.fatherName}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="age"
                            value={editedData.age}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="gender"
                            value={editedData.gender}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="cnic"
                            value={editedData.cnic}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="contactNo"
                            value={editedData.contactNo}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="email"
                            value={editedData.email}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="address"
                            value={editedData.address}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="registrationNo"
                            value={editedData.registrationNo}
                            onChange={handleInputChange}
                        />
                        {/* Add other input fields for editing other details */}
                    </>
                ) : (
                    <>
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
                                <p className="pdp-smallHeading">CNIC: </p>
                                <p>{data.cnic}</p>
                            </div>
                            <div className="pdp-subBoxes">
                                <p className="pdp-smallHeading">Contact#: </p>
                                <p>{data.contactNo}</p>
                            </div>
                            <div className="pdp-subBoxes">
                                <p className="pdp-smallHeading">Email: </p>
                                <p>{data.email}</p>
                            </div>
                            <div className="pdp-subBoxes">
                                <p className="pdp-smallHeading">Address: </p>
                                <p>{data.address}</p>
                            </div>
                            <div className="pdp-subBoxes">
                                <p className="pdp-smallHeading">Pin No: </p>
                                <p>{data.pin}</p>
                            </div>

                <div className="pdp-subBoxes">
                    <p className="pdp-smallHeading">Last visit on: </p>
                    <p>20/01/2024, 12:45 PM</p>
                </div>.

                <div className="pdp-subBoxes">
                    <p className="pdp-smallHeading">No of Visit: </p>
                    <p>04</p>
                </div>
            </div>

            </>
                )}
        </div>



    </div>)
}
export default PatientDetailPage;