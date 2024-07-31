import React, { useState, useEffect } from "react";
import '../CSS/ErrorMessage.css';
import { useNavigate } from "react-router-dom";
import { getPatientDetails } from '../../Services/API';
import ReactLoading from 'react-loading';
import { useValidators } from '../../utility/Validation/InputValidator'; // Import the useValidators hook

function SearchPatient() {
  const navigate = useNavigate();
  const [selectedField, setSelectedField] = useState('Name');
  const [queryByPIN, setQueryByPIN] = useState('');
  const [queryByContact, setQueryByContact] = useState('');
  const [queryByCNIC, setQueryByCNIC] = useState('');
  const [testData, setTestData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState({
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
  const [loading, setLoading] = useState(false);
  const [hasQuery, setHasQuery] = useState(false); // New state to track if there is a query

  const {
    errors,
    validateString,
    validateInteger,
    validateCNIC,
    validatePhoneNumber,
    validateEmail,
    validateAddress,
    validateRemarks,
    validatePIN,
    clearErrors, 
  } = useValidators();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getPatientDetails();
      setTestData(data);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (event) => {
    const newField = event.target.value;
    setSelectedField(newField);
    clearErrors(newField); // Clear errors when changing the search field
    resetQueries(); // Reset queries when changing the search field
    setHasQuery(false); // Reset hasQuery state
  };

  const resetQueries = () => {
    setQueryByPIN('');
    setQueryByContact('');
    setQueryByCNIC('');
  };

  const handlePinChange = (event) => {
    let query = event.target.value;
    
    // Remove non-numeric characters except for the hyphen
    query = query.replace(/[^0-9-]/g, '');
    
    // Automatically insert hyphen after 4 digits (if not already present)
    if (query.length > 4 && query[4] !== '-') {
      query = query.slice(0, 4) + '-' + query.slice(4);
    } else if (query.length <= 4 && query.includes('-')) {
      // Remove hyphen if less than or equal to 4 characters
      query = query.replace('-', '');
    }
    
    setQueryByPIN(query);
    setHasQuery(query.length >= 6); // Set hasQuery to true if the query length is 6 or more
    
    // Validate the PIN if it's the correct length
    if (query.length >= 6) {
      validatePIN('pin', query);
    } else {
      clearErrors('PIN');
    }
  };
  
  const handlePinContact = (event) => {
    let query = event.target.value;
    
    // Remove non-numeric characters for phone number search
    query = query.replace(/\D/g, '');
    
    setQueryByContact(query);
    setHasQuery(query.length >= 8); // Set hasQuery to true if the query length is 8 or more
    
    if (query.length >= 8) {
      validatePhoneNumber('mobileNumber', query);
    } else {
      clearErrors('CONTACT');
    }
  };
  
  const handlePinCnic = (event) => {
    let query = event.target.value;
    
    // Remove non-numeric characters
    query = query.replace(/\D/g, '');
    
    // Format as xxxxx-xxxxxxx-x
    if (query.length > 5 && query[5] !== '-') {
      query = query.slice(0, 5) + '-' + query.slice(5);
    }
    if (query.length > 13 && query[13] !== '-') {
      query = query.slice(0, 13) + '-' + query.slice(13);
    }
    
    setQueryByCNIC(query);
    
    // Count only digits for the hasQuery state
    const digitsOnly = query.replace(/-/g, '');
    setHasQuery(digitsOnly.length >= 10); // Set hasQuery to true if the digit length is 10 or more
    
    if (digitsOnly.length >= 10) {
      validateCNIC('cnic', digitsOnly);
    } else {
      clearErrors('CNIC');
    }
  };
  
  const handleRowRadioChange = (id) => {
    const row = testData.find((data) => data._id === id);
    setSelectedPatient(row);
  };

  const handleGenerateToken = () => {
    if (selectedPatient) {
      navigate("/receptionist/search_test", { state: { patientData: selectedPatient } });
    } else {
      window.alert('Please select a patient.');
    }
  };

  const filteredData = selectedField === "PIN" && queryByPIN.length >= 6
  ? testData.filter(data => data.pin.includes(queryByPIN))
  : (selectedField === "CONTACT" && queryByContact.length >= 8
    ? testData.filter(data => data.mobileNumber.replace(/\D/g, '').includes(queryByContact)) // Normalize phone numbers
    : (selectedField === "CNIC" && queryByCNIC.length >= 10
      ? testData.filter(data => {
          // Normalize CNICs in data for consistent comparison
          const normalizedCNIC = data.cnic.replace(/-/g, '');
          return normalizedCNIC.includes(queryByCNIC.replace(/-/g, ''));
        })
      : []
    )
  );

  return (
    <div id="SearchTest">
      {loading && (
        <div className="loader-container">
          <ReactLoading type={"bars"} color={"#03fc4e"} height={100} width={100} />
        </div>
      )}
      <div className="SearchTest-innerComponent">
        <div className="Search-Container" style={{ width: "100%" }}>
          <p>Search Here</p>
          <div className="Search-Main">
            <div className="Search-Content">
              <label>Search By PIN</label>
              <div className="ViewPat-search-input">
                <input type="radio" value="PIN" checked={selectedField === 'PIN'} onChange={handleFieldChange} className="ViewPat-search-radio" />
                <input type="text" name="search-by-pin" placeholder="Search" className="ViewPat-search-text" disabled={selectedField !== 'PIN'} onChange={handlePinChange} value={queryByPIN} />
              </div>
              {errors.pin && <h6 className="errorMSG">{errors.pin}</h6>}
            </div>
            <div className="Search-Content">
              <label>Search By Contact #</label>
              <div className="ViewPat-search-input">
                <input type="radio" value="CONTACT" checked={selectedField === 'CONTACT'} onChange={handleFieldChange} className="ViewPat-search-radio" />
                <input type="text" name="search-by-contact" placeholder="Search" className="ViewPat-search-text" disabled={selectedField !== 'CONTACT'} onChange={handlePinContact} value={queryByContact} />
              </div>
              {errors.mobileNumber && <h6 className="errorMSG">{errors.mobileNumber}</h6>}
            </div>
            <div className="Search-Content">
              <label>Search By CNIC</label>
              <div className="ViewPat-search-input">
                <input type="radio" value="CNIC" checked={selectedField === 'CNIC'} onChange={handleFieldChange} className="ViewPat-search-radio" />
                <input type="text" name="search-by-cnic" placeholder="Search" className="ViewPat-search-text" disabled={selectedField !== 'CNIC'} onChange={handlePinCnic} value={queryByCNIC} />
              </div>
              {errors.cnic && <h6 className="errorMSG">{errors.cnic}</h6>}
            </div>
          </div>
        </div>
        {hasQuery && ( // Conditionally render table based on hasQuery
          <div className="searchTest-mainBox">
            <div className="scrollable-table-container">
              <table className="scrollable-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>PIN</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Cnic</th>
                    <th>Mobile Number</th>
                    <th>Address</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((data) => (
                    <tr key={data._id}>
                      <td>
                        <input
                          type="radio"
                          name="selectedPatient"
                          onChange={() => handleRowRadioChange(data._id)}
                          checked={selectedPatient && selectedPatient?._id === data._id}
                        />
                      </td>
                      <td>{data.pin}</td>
                      <td>{data.name}</td>
                      <td>{data.gender}</td>
                      <td>{data.age}</td>
                      <td>{data.cnic}</td>
                      <td>{data.mobileNumber}</td>
                      <td>{data.address}</td>
                      <td>{data.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <button type="button" id="searchTest-btn" onClick={handleGenerateToken} disabled={!selectedPatient.pin} style={!selectedPatient.pin ? { display: "none" } : {}}>Select Test</button>
    </div>
  );
}

export default SearchPatient;
