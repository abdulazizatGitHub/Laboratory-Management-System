import React, { useState } from "react";
import { HiOutlineCamera } from "react-icons/hi2";
import '../css/StaffRegistration.css';

const StaffRegistration = () => {
    const [selectedGender, setSelectedGender] = useState('');
    const [image, setImage] = useState(null);

    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
            };
            reader.readAsDataURL(file);
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
                            <input type="text" name="name" placeholder="Enter Name" />
                        </div>
                        <div className="sr-form-inputs-container">
                            <label>Father Name</label>
                            <input type="text" name="name" placeholder="Enter Father Name" />
                        </div>
                        <div className="sr-form-inputs-container">
                            <label>Gender</label>
                            <div className="sr-form-gender-container">
                                <div className="sr-form-gender-main">
                                    <label>Male</label>
                                    <input
                                        type="radio"
                                        value="male"
                                        checked={selectedGender === 'male'}
                                        onChange={handleGenderChange}
                                    />
                                </div>
                                <div className="sr-form-gender-main">
                                    <label>Female</label>
                                    <input
                                        type="radio"
                                        value="female"
                                        checked={selectedGender === 'female'}
                                        onChange={handleGenderChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sr-form-inputs-container">
                            <label>Age</label>
                            <input type="text" name="name" placeholder="Enter Age" />
                        </div>
                        <div className="sr-form-inputs-container">
                            <label>Role</label>
                            <input type="text" name="name" placeholder="Enter Role" />
                        </div>
                        <div className="sr-form-inputs-container">
                            <label>Shift</label>
                            <input type="text" name="name" placeholder="Enter Shift" />
                        </div>
                    </div>

                    <h3>Contact Details</h3>
                    <div className="sr-form-details-container">
                        <div className="sr-form-inputs-container">
                            <label>Contact #</label>
                            <input type="text" name="name" placeholder="Enter Contact Number" />
                        </div>
                        <div className="sr-form-inputs-container">
                            <label>CNIC</label>
                            <input type="text" name="name" placeholder="Enter 15 digit CNIC" />
                        </div>
                        <div className="sr-form-inputs-container">
                            <label>Enter Address</label>
                            <input type="text" name="name" placeholder="Enter Address" />
                        </div>
                    </div>
                    <div className="sr-form-button-container">
                        <button>Add Documents</button>
                        <button>Register</button>
                    </div>

                </form>
            </div>
            <div className="sr-image-container">
                <div className="sr-image-text">
                    <h4>Staff Image</h4>
                    <p>Add Staff Image Here</p>
                </div>
                <div className="sr-image-main">
                    <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="imageUpload">
                        <span><HiOutlineCamera size={40} color="#22CAB8" cursor='pointer' /></span>
                    </label>
                    {image && <img src={image} alt="Staff Image" />}
                </div>
                </div>

        </div>
    )
}
export default StaffRegistration;