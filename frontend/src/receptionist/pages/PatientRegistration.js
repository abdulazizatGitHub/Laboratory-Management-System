import React, { useEffect, useState } from "react";
import NamingBar from "../components/NamingBar";
import '../CSS/PatientRegistration.css';
import '../CSS/ErrorMessage.css';
import { getPatientDetails, registerPatient } from "../../Services/API";
import { useNavigate } from "react-router-dom";
import { fetchTokenCount, getAllPatientNumbers } from "../../Services/API";
import ReactLoading from 'react-loading';
import { useValidators } from '../../utility/Validation/InputValidator'; // Importing the useValidators hook

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
    pin: '',
  });

  const [data, setData] = useState([]);
  const [selectedGender, setSelectedGender] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    errors,
    validateString,
    validateInteger,
    validateCNIC,
    validatePhoneNumber,
    validateEmail,
    validateAddress,
    validateRemarks,
    setErrors,
  } = useValidators();

  useEffect(() => {
    fetchPatientData();
  }, []);

  useEffect(() => {
    generatePin();
  }, [data]);

  const generatePin = () => {
    setLoading(true);
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(2);
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);

    let storedMonth = localStorage.getItem('month');
    if (!storedMonth) {
      localStorage.setItem('month', month);
      storedMonth = month;
    }

    let counter = 1;
    if (data.length > 0) {
      const existing_pc = parseInt(data[data.length - 1].pin.slice(-4));
      counter = existing_pc + 1;
    }

    if (storedMonth !== month) {
      counter = 1;
      localStorage.setItem('month', month);
    }

    const formattedCounter = ('0000' + counter).slice(-4);
    const pin = `${year}${month}-${formattedCounter}`;

    localStorage.setItem('generatedPin', pin);
    localStorage.setItem('year', year);

    setFormData(prevData => ({ ...prevData, pin }));
    setLoading(false);
  };

  const fetchPatientData = async () => {
    setLoading(true);
    const Pdata = await getPatientDetails();
    setData(Pdata);
    setLoading(false);
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    setFormData(prevData => ({
      ...prevData,
      gender: event.target.value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));

    // Validate each field as the user types
    switch (name) {
      case 'name':
        validateString(name, value);
        break;
      case 'age':
        validateInteger(name, value);
        break;
      case 'cnic':
        validateCNIC(name, value);
        break;
      case 'mobileNumber':
        validatePhoneNumber(name, value);
        break;
      case 'email':
        validateEmail(name, value);
        break;
      case 'address':
        validateAddress(name, value);
        break;
      case 'refDoctor':
        validateString(name, value);
        break;
      case 'internalRemarks':
        validateRemarks(name, value);
        break;
      case 'patientRemarks':
        validateRemarks(name, value);
        break;
      default:
        break;
    }
  };

  const handleNextClick = async (event) => {
    event.preventDefault();

    const requiredFields = ['name', 'gender', 'age', 'cnic', 'mobileNumber', 'refDoctor', 'internalRemarks', 'patientRemarks'];
    const isEmpty = requiredFields.some(field => !formData[field]);

    if (isEmpty) {
      window.alert('Please fill in all required fields.');
      return;
    }

    if (!validateString('name', formData.name)) return;
    if (!validateInteger('age', formData.age)) return;
    if (!validateCNIC('cnic', formData.cnic)) return;
    if (!validatePhoneNumber('mobileNumber', formData.mobileNumber)) return;
    if (!validateEmail('email', formData.email)) return;
    if (!validateAddress('address', formData.address)) return;
    if (!validateString('refDoctor', formData.refDoctor)) return;
    if (!validateRemarks('internalRemarks', formData.internalRemarks)) return;
    if (!validateRemarks('patientRemarks', formData.patientRemarks)) return;

    setLoading(true);
    try {
      const response = await registerPatient(formData);
      if (response.status === 200 && response.data.patient) {
        window.alert('Patient already exists. Loading existing data.');
        navigate("/receptionist/SearchPatient");
      } else if (response.status === 201 && response.data.patient) {
        window.alert('Patient registered successfully');
        navigate("/receptionist/search_test", { state: { patientData: formData } });
      } else {
        console.error('Unexpected response from the server:', response);
      }
    } catch (error) {
      if (error.response && error.response.status === 200 && error.response.data.patient) {
        window.alert('Patient already exists. Loading existing data.');
        navigate("/receptionist/search_patient");
      } else {
        console.error('Error during registration:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Patient-Main-Container">
      {loading && (
        <div className="loader-container">
          <ReactLoading type={"bars"} color={"#03fc4e"} height={100} width={100} />
        </div>
      )}
      <form className="Patient-Details-Container">
        <p style={{ alignSelf: "center", fontSize: "1.5rem", fontWeight: "bold", color: "#00ADB5" }}>Patient Registration</p>
        <h2 style={{ marginLeft: "0.5rem" }}>Patient Details</h2>
        <div className="patient-Details-pers">
          <div className="patient-divss">
            <p>Patient Name</p>
            <input className="inputFieldPR" type="text" id="name" name="name" placeholder="Enter Patient Name" value={formData.name} onChange={handleInputChange} required />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="patient-divss">
            <p>Age</p>
            <input className="inputFieldPR" type="number" id="age" name="age" placeholder="Enter Patient Age" value={formData.age} onChange={handleInputChange} required />
            {errors.age && <p className="error">{errors.age}</p>}
          </div>
          <div className="patient-divss">
            <p>Gender</p>
            <div className="radio-div">
              <div className="patient-divss-radio-btns inputFieldPR">
                <input
                  className="inputFieldPR"
                  style={{ width: "2rem", height: "1rem" }}
                  type="radio"
                  value="male"
                  checked={selectedGender === "male"}
                  onChange={handleGenderChange}
                  required
                />
                <p style={{ marginLeft: "0.2rem" }}>Male</p>
              </div>
              <div className="patient-divss-radio-btns inputFieldPR">
                <input
                  style={{ width: "2rem", height: "1rem", borderRadius: "5px" }}
                  className="inputFieldPR"
                  type="radio"
                  value="female"
                  checked={selectedGender === "female"}
                  onChange={handleGenderChange}
                  required
                />
                <p>Female</p>
              </div>
            </div>
          </div>
          <div className="patient-divss">
            <p>CNIC</p>
            <input className="inputFieldPR" type="text" id="cnic" name="cnic" placeholder="Enter Patient CNIC" value={formData.cnic} onChange={handleInputChange} required />
            {errors.cnic && <p className="error">{errors.cnic}</p>}
          </div>
        </div>

        <h2 style={{ marginLeft: "0.5rem" }}>Patient Contact Details</h2>
        <div className="patient-Details-pers">
          <div className="patient-divss">
            <p>Mobile Number</p>
            <input className="inputFieldPR" type="text" id="mobileNumber" name="mobileNumber" placeholder="Enter Patient Contact" value={formData.mobileNumber}
              onChange={handleInputChange} required />
            {errors.mobileNumber && <p className="error">{errors.mobileNumber}</p>}
          </div>
          <div className="patient-divss">
            <p>Email</p>
            <input className="inputFieldPR" type="text" id="email" name="email" placeholder="Enter Patient Email" value={formData.email}
              onChange={handleInputChange} required />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="patient-divss">
            <p>Address</p>
            <input className="inputFieldPR" type="text" id="address" name="address" placeholder="Enter Patient Address" value={formData.address}
              onChange={handleInputChange} required />
            {errors.address && <p className="error">{errors.address}</p>}
          </div>
        </div>

        <h2 style={{ marginLeft: "0.5rem" }}>Visit Details</h2>
        <div className="patient-Details-pers">
          <div className="patient-divss">
            <p>Referred By</p>
            <input className="inputFieldPR" type="text" id="refDoctor" name="refDoctor" placeholder="Enter Your Name" value={formData.refDoctor}
              onChange={handleInputChange} required />
            {errors.refDoctor && <p className="error">{errors.refDoctor}</p>}
          </div>
          <div className="patient-divss">
            <p>Patient Remarks</p>
            <input className="inputFieldPR" type="text" id="patientRemarks" name="patientRemarks" placeholder="Enter Patient Remarks" value={formData.patientRemarks}
              onChange={handleInputChange} required />
            {errors.patientRemarks && <p className="error">{errors.patientRemarks}</p>}
          </div>
          <div className="patient-divss">
            <p>Internal Remarks</p>
            <input className="inputFieldPR" type="text" id="internalRemarks" name="internalRemarks" placeholder="Enter Your Remarks" value={formData.internalRemarks}
              onChange={handleInputChange} required />
            {errors.internalRemarks && <p className="error">{errors.internalRemarks}</p>}
          </div>
        </div>
        <div className="btn-container"><button className="Next-button" onClick={(event) => handleNextClick(event)}>Next</button></div>
      </form>
    </div>
  );
}

export default PatientRegistration;
