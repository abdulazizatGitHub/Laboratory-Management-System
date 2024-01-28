import React, { useState } from "react"
import NamingBar from "../components/NamingBar";
import '../CSS/PatientRegistration.css';
import { registerPatient } from "../../Services/API";

const PatientRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    cnic: '',
    mobileNumber: '',
    address: '',
    email: '',
    refDoctor: '',
    internalRemarks: '',
    patientRemarks: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleNextClick = async () => {
    try {
      const registrationSuccess = await registerPatient(formData);
  
      if (registrationSuccess) {
        // Display an alert with the success message
        window.alert('Patient registered successfully');
        // Handle any additional actions, such as redirecting to a success page
        console.log('Redirecting to success page');
      } else {
        // Handle registration failure
        console.error('Show an error message to the user');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  


  return (

    <div className="Main">

      <section className="Profile-Main-Container">

        <div className="Patient-Profile">
          <h2>Patient Details</h2>
          <div className="Patient-Personal-Profile">
            <div className="left-side-Profile">
              <label for="fname">Patient name</label><br></br>
              <input type="text" id="name" name="name" placeholder="Enter Your Name" value={formData.name} onChange={handleInputChange} /><br></br>

              <label for="fname">Gender</label><br></br>
              <input type="text" id="gender" name="gender" placeholder="Enter Your Gender" value={formData.gender} onChange={handleInputChange} />
            </div>

            <div className="Right-side-Profile">
              <label for="fname">Age</label><br></br>
              <input type="Number" id="age" name="age" placeholder="Enter Your Name" value={formData.age} onChange={handleInputChange} /><br></br>

              <label for="fname">CNIC</label><br></br>
              <input type="text" id="cnic" name="cnic" placeholder="Enter Your Gender" value={formData.cnic} onChange={handleInputChange} />
            </div>
          </div>

          <h2>Patient Contact Details</h2>
          <div className="Patient-contact">
            <div className="left-side-Profile">
              <label for="fname">Mobile Number</label><br></br>
              <input type="text" id="mobileNumber" name="mobileNumber" placeholder="Enter Your Contact" value={formData.mobileNumber}
                onChange={handleInputChange} /><br></br>

              <label for="fname">Address</label><br></br>
              <input type="text" id="address" name="address" placeholder="Enter Your Address" value={formData.address}
                onChange={handleInputChange} />

            </div>

            <div className="Right-side-Profile">
              <label for="fname">Email</label><br></br>
              <input type="text" id="email" name="email" placeholder="Enter Your Emal" value={formData.email}
                onChange={handleInputChange} /><br></br>



            </div>


          </div>

          <h2>Contact Details</h2>
          <div className="Doctor-Contact">
            <div className="left-side-Profile">
              <label for="fname">Reff. Doctor</label><br></br>
              <input type="text" id="refDoctor" name="refDoctor" placeholder="Enter Your Name" value={formData.refDoctor}
                onChange={handleInputChange} /><br></br>

              <label for="fname">Internal Remarks</label><br></br>
              <input type="text" id="internalRemarks" name="internalRemarks" placeholder="Enter Your Rmarks" value={formData.internalRemarks}
                onChange={handleInputChange} />

            </div>

            <div className="Right-side-Profile">
              <label for="fname">Patient Remarks</label><br></br>
              <input type="text" id="patientRemarks" name="patientRemarks" placeholder="Enter Patient Remarks" value={formData.patientRemarks}
                onChange={handleInputChange} /><br></br>



            </div>


          </div>

          <button className="Next-button" onClick={handleNextClick}>Next</button>
        </div>

        <div className="Patient-Image">

        </div>

      </section>

    </div>
  )
}

export default PatientRegistration;