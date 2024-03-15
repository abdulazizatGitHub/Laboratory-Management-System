import React, { useEffect, useState } from "react";
import "../css/PatientDetailPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { deletePatData, updatePatData, getGeneratedToken } from "../../Services/API";
import ReactLoading from 'react-loading';

const PatientDetailPage = () => {
    const navigation = useNavigate();
    const location = useLocation();
    const { data } = location.state;
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedData, setEditedData] = useState(data); 
    const [visit,setVisit] = useState(0);
    const [lastVisit,setLastVisit] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state

    useEffect(() => {
        const getTokenData = async () => {
            setLoading(true); // Start loading
            const token = await getGeneratedToken();
            const eachToken = token.filter(t => t.patientData.pin == data.pin);
            setVisit(eachToken.length);
            setLastVisit(eachToken[eachToken.length - 1].dateTime);
            setLoading(false); // Stop loading
        }
        getTokenData();
    }, []);

    const delPat = async () => {
        setLoading(true); // Start loading
        try {
            const res = await deletePatData(data._id);
            alert(res.data);
            navigation('/admin/view-patient-detail');
        } catch (error) {
            console.error('Error deleting patient:', error);
        } finally {
            setLoading(false); // Stop loading
        }
    }

    const handleEdit = () => {
        setShowEditModal(true);
    }

    const handleSave = async () => {
        setLoading(true); // Start loading
        try {
            // Call API to save edited data
            await updatePatData(editedData);
            // Close modal
            setShowEditModal(false);
            // Reload the page to reflect the changes
            window.location.reload();
        } catch (error) {
            console.error('Error updating patient data:', error);
        } finally {
            setLoading(false); // Stop loading
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

    return (<div id="patientDetailPage-Fullcontainer">
        <div id="pdp-nameAndButtons">
            <p id="pdp-name">Patient Detail</p>
            <button type="button" id="pdp-btn" onClick={handleEdit}>Edit</button>
            <button type="button" id="pdp-btn" onClick={delPat}>Delete</button>
        </div>
        <div id="pdp-container">
            <p className="pdp-heading">Personal Detail</p>
            <div className="pdp-details">
                <div className="pdp-subBoxes">
                    <p className="pdp-smallHeading">Name: </p>
                    <p className="pdp-text">{data.name}</p>
                </div>.
                
                <div className="pdp-subBoxes">
                    <p className="pdp-smallHeading">Age: </p>
                    <p className="pdp-text">{data.age}</p>
                </div>.

                <div className="pdp-subBoxes">
                    <p className="pdp-smallHeading">Gender: </p>
                    <p className="pdp-text">{data.gender}</p>
                </div>


                <div className="pdp-subBoxes">
                    <p className="pdp-smallHeading">CNIC: </p>
                    <p className="pdp-text">{data.cnic}</p>
                </div>
            </div>


            <p className="pdp-heading">Contact Detail</p>
            <div className="pdp-details">
                <div className="pdp-subBoxes">
                    <p className="pdp-smallHeading">Contact#: </p>
                    <p className="pdp-text">{data.mobileNumber}</p>
                </div>.

                <div className="pdp-subBoxes">
                    <p className="pdp-smallHeading">Email: </p>
                    <p className="pdp-text">{data.email}</p>
                </div>.

                <div className="pdp-subBoxes">
                    <p className="pdp-smallHeading">Address: </p>
                    <p className="pdp-text">{data.address}</p>
                </div>
            </div>

            <p className="pdp-heading">Visiting Detail</p>
            <div className="pdp-details">
                <div className="pdp-subBoxes">
                    <p className="pdp-smallHeading">Pin No: </p>
                    <p className="pdp-text">{data.pin}</p>
                </div>.

                <div className="pdp-subBoxes">
                    <p className="pdp-smallHeading">Last visit on: </p>
                    <p className="pdp-text">{lastVisit}</p>
                </div>.

                <div className="pdp-subBoxes">
                    <p className="pdp-smallHeading">No of Visit: </p>
                    <p className="pdp-text">{visit}</p>
                </div>
            </div>
           
            {showEditModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => setShowEditModal(false)}>&times;</span>
                            <h2>Edit Details</h2>
                            <div  id="edit-divss">
                            <div className="edit-divs-each-input">
                                <label>Name:</label>
                                <input type="text" name="name" value={editedData.name} onChange={handleChange} />
                            </div>
                            <div className="edit-divs-each-input">
                                <label>Age:</label>
                                <input type="number" name="age" value={editedData.age} onChange={handleChange} />
                            </div>
                            <div className="edit-divs-each-input">
                                <label>Gender : </label>
                                <select name="gender" value={editedData.gender} onChange={handleChange}>
                                    <option value="Male">Male</option>
                                    <option value="Male">Female</option>
                                </select>
                            </div>
                            <div className="edit-divs-each-input">
                                <label>CNIC:</label>
                                <input type="text" name="cnic" value={editedData.cnic} onChange={handleChange} />
                            </div>
                            <div className="edit-divs-each-input">
                                <label>Contact No:</label>
                                <input type="text" name="contactNumber" value={editedData.mobileNumber} onChange={handleChange} />
                            </div>
                            <div className="edit-divs-each-input">
                                <label>Address:</label>
                                <input type="text" name="address" value={editedData.address} onChange={handleChange} />
                            </div>


                            <button onClick={handleSave}>Save</button>

                            </div>
                        </div>
                    </div>
                )}

        </div>
    </div>)
}
export default PatientDetailPage;