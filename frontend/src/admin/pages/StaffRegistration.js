import React, { useState } from "react";
import { HiOutlineCamera } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { FcCheckmark, FcCancel } from "react-icons/fc"; // Import additional icons
import '../css/StaffRegistration.css';
import { staffRegsiteration } from "../../Services/API";

const StaffRegistration = () => {
    const [downloadImgUrl, setDownloadImgUrl] = useState(null);

    const [staffDetails, setStaffDetails] = useState({
        name: '',
        fatherName: '',
        gender: '',
        age: '',
        role: '', // Removed default role value
        shift: '',
        contactNumber: '',
        cnic: '',
        address: '',
        image: "",
    });

    const [alert, setAlert] = useState({
        show: false,
        message: "",
        icon: null,
        loading: false,
    });

    const showAlert = (message, type) => {
        let icon = null;
        let alertClass = "";

        switch (type) {
            case "success":
                icon = <FcCheckmark size={20} color="green" />;
                alertClass = "success-alert";
                break;
            case "error":
                icon = <FcCancel size={20} color="red" />;
                alertClass = "error-alert";
                break;
            default:
                break;
        }

        setAlert({
            show: true,
            message,
            icon,
            loading: false,
            alertClass, // Add the alert class
        });

        setTimeout(() => {
            setAlert({
                show: false,
                message: "",
                icon: null,
                loading: false,
                alertClass: "",
            });
        }, 3000);
    };

    const { name, fatherName, gender, age, role, shift, contactNumber, cnic, address, image } = staffDetails;

    const handleInputChange = (e) => {
        setStaffDetails({ ...staffDetails, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onload = () => {
              // Get the URL of the image
              const imageUrl = reader.result;
              setDownloadImgUrl(imageUrl);
              console.log(imageUrl)
            };
        
            reader.readAsDataURL(file);
            setStaffDetails({ ...staffDetails, image: file });
        }
    };

    const handleRemoveImage = () => {
        setStaffDetails({ ...staffDetails, image: "" });
    };

    const handleRegisterStaff = async (e) => {
        e.preventDefault();
        setAlert({ ...alert, loading: true, message: "Registering staff..." })
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('fatherName', fatherName);
            formData.append('gender', gender);
            formData.append('age', age);
            formData.append('role', role); // Include role in formData
            formData.append('shift', shift);
            formData.append('contactNumber', contactNumber);
            formData.append('cnic', cnic);
            formData.append('address', address);
            formData.append('image', image);
            console.log("Form data is ", image)

            const response = await staffRegsiteration(formData);
            if (response.data.message) {
                showAlert(response.data.message, "success");
            } else {
                showAlert("Registration failed", "error");
            }
        } catch (error) {
            console.error('Error registering staff:', error);
        }
    };

    return (
        <div className="Staff-Registration-Container">
            <div className="sr-form-container">
                <p>New Registration</p>
                <form className="sr-form">
                    <h3>Personal Details</h3>
                    <div className="sr-form-details-container">
                        <div className="sr-form-inputs-container">
                            <label>Name</label>
                            <input type="text" name="name" placeholder="Enter Name" onChange={handleInputChange} />
                        </div>
                        <div className="sr-form-inputs-container">
                            <label>Father Name</label>
                            <input type="text" name="fatherName" placeholder="Enter Father Name" onChange={handleInputChange} />
                        </div>
                        <div className="sr-form-inputs-container">
                            <label>Gender</label>
                            <div className="sr-form-gender-container">
                                <div className="sr-form-gender-main">
                                    <label>Male</label>
                                    <input
                                        name="gender"
                                        type="radio"
                                        value="male"
                                        checked={gender === 'male'}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="sr-form-gender-main">
                                    <label>Female</label>
                                    <input
                                        name="gender"
                                        type="radio"
                                        value="female"
                                        checked={gender === 'female'}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sr-form-inputs-container">
                            <label>Age</label>
                            <input type="text" name="age" placeholder="Enter Age" onChange={handleInputChange} />
                        </div>
                        <div className="sr-form-inputs-container">
                            <label>Role</label>
                            <select
                                name="role"
                                value={role}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Role</option>
                                <option value="Admin">Admin</option>
                                <option value="Receptionist">Receptionist</option>
                                <option value="Phlebotomy">Phlebotomy</option>
                            </select>
                        </div>
                        <div className="sr-form-inputs-container">
                            <label>Shift</label>
                            <input type="text" name="shift" placeholder="Enter Shift" onChange={handleInputChange} />
                        </div>
                    </div>

                    <h3>Contact Details</h3>
                    <div className="sr-form-details-container">
                        <div className="sr-form-inputs-container">
                            <label>Contact #</label>
                            <input type="text" name="contactNumber" placeholder="Enter Contact Number" onChange={handleInputChange} />
                        </div>
                        <div className="sr-form-inputs-container">
                            <label>CNIC</label>
                            <input type="text" name="cnic" placeholder="Enter 15 digit CNIC" onChange={handleInputChange} />
                        </div>
                        <div className="sr-form-inputs-container">
                            <label>Address</label>
                            <input type="text" name="address" placeholder="Enter Address" onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="sr-form-button-container">
                        <button>Add Documents</button>
                        <button onClick={handleRegisterStaff}>Register</button>
                    </div>

                </form>
            </div>
            <div className="sr-image-container">
                <div className="sr-image-text">
                    <h4>Staff Image</h4>
                    <p>Add Staff Image Here</p>
                </div>
                <div className="sr-image-main">
                    <label htmlFor="imageUpload">
                        {/* Conditionally render either the image or the camera icon */}
                        {downloadImgUrl ? (
                            <div className="staff-image-content">
                                <img
                                    style={{ width: '15rem', overflow: 'hidden', maxHeight: '9rem' }}
                                    src={downloadImgUrl} // Use URL.createObjectURL to display the image
                                    alt="Staff Image"
                                />
                                <div className="staff-image-remover" onClick={handleRemoveImage}><IoClose size={18} /></div>
                            </div>
                        ) : (
                            <span>
                                <HiOutlineCamera size={40} color="#22CAB8" cursor="pointer" />
                            </span>
                        )}
                    </label>
                    <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                    />
                </div>
            </div>
            {alert.show && (
                <div className={`custom-alert ${alert.alertClass}`}>
                    <p>
                        {alert.icon} {alert.message}
                    </p>
                </div>
            )}

        </div>
    )
}

export default StaffRegistration;
