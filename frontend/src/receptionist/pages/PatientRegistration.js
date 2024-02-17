import React, { useEffect, useState } from "react"
import NamingBar from "../components/NamingBar";
import '../CSS/PatientRegistration.css';
import { registerPatient } from "../../Services/API";
import { useNavigate } from "react-router-dom";
import { fetchTokenCount } from "../../Services/API";

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
    pin:'',
  });

  const [selectedGender, setSelectedGender] = useState('');
  const navigate = useNavigate();
  const[tokenCount,setTokenCount]=useState(0);
  useEffect(() => {
    fetchToken();
    
    }, []); // Run only once when the component mounts

    const fetchToken=()=>{
       fetchTokenCount()
      .then(tokenCount => setTokenCount(tokenCount))
      .catch(error => console.error('Error fetching token count:', error));
 
    }

    const generatePin = (tokenCount) => {
     const currentDate = new Date();
      const year = currentDate.getFullYear().toString().slice(-2); // Get last two digits of the year
      const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
      const pinNumber = `${year}${month}-${(tokenCount + 1).toString().padStart(5, '0')}`;
      setFormData((prevData) => ({
        ...prevData,
        pin: pinNumber,
      }));
    };
    
  

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      gender: event.target.value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  

  const handleNextClick = async () => {
    try {
      generatePin(tokenCount);
       const response = await registerPatient(formData);
  
      if (response.status === 200 && response.data.patient) {
        // Patient already exists, show warning
        window.alert('Patient already exists. Loading existing data.');
      } else if (response.status === 201 && response.data.patient) {
        window.alert('Patient registered successfully');

        navigate("/receptionist/search_test", { state: { patientData: formData } });
      } else {
        // Handle other cases (error or unexpected response)
        console.error('Unexpected response from the server:', response);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  
  


  return (

    <div className="Patient-Main-Container">
      <div className="Patient-Details-Container">
        <h2>Patient Details</h2>
        <div className="Personal-Details">
          <div className="left-side-Profile">
            <label for="fname">Patient name</label><br></br>
            <input type="text" id="name" name="name" placeholder="Enter Patient Name" value={formData.name} onChange={handleInputChange} /><br></br>

            <label for="fname">Gender</label><br></br>
            <div className="Patient-Gender-Container">
              <div className="Patient-Gender-label">
                <label className="patientGender-txt">

                  Male
                </label>
                <input
          className="patientGender-radio"
          type="radio"
          value="male"
          checked={selectedGender === "male"}
          onChange={handleGenderChange}
          required // Add required attribute here
        />

              </div>
              <div className="Patient-Gender-label">
                <label className="patientGender-txt">
                  Female
                </label>
                <input
          className="patientGender-radio"
          type="radio"
          value="female"
          checked={selectedGender === "female"}
          onChange={handleGenderChange}
          required // Add required attribute here
        />

              </div>
            </div>
          </div>

          <div className="Right-side-Profile">
            <label for="fname">Age</label><br></br>
            <input type="Number" id="age" name="age" placeholder="Enter Patient Age" value={formData.age} onChange={handleInputChange} /><br></br>

            <label for="fname">CNIC</label><br></br>
            <input type="text" id="cnic" name="cnic" placeholder="Enter Patient CNIC" value={formData.cnic} onChange={handleInputChange} />
          </div>
        </div>

        <h2>Patient Contact Details</h2>
        <div className="Contact-Details">
          <div className="left-side-Profile">
            <label for="fname">Mobile Number</label><br></br>
            <input type="text" id="mobileNumber" name="mobileNumber" placeholder="Enter Patient Contact" value={formData.mobileNumber}
              onChange={handleInputChange} /><br></br>

            <label for="fname">Address</label><br></br>
            <input type="text" id="address" name="address" placeholder="Enter Patient Address" value={formData.address}
              onChange={handleInputChange} />
          </div>

          <div className="Right-side-Profile">
            <label for="fname">Email</label><br></br>
            <input type="text" id="email" name="email" placeholder="Enter Patient Email" value={formData.email}
              onChange={handleInputChange} /><br></br>
          </div>
        </div>

        <h2>Visit Details</h2>
        <div className="Visit-Details">
          <div className="left-side-Profile">
            <label for="fname">Reffered By</label><br></br>
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
        <div className="btn-container"><button className="Next-button" onClick={handleNextClick}>Next</button></div>
      </div>

      <section className="Profile-Main-Container">

        
      </section>

    </div>
  )
}

export default PatientRegistration;