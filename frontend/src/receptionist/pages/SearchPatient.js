import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPatientDetails } from '../../Services/API';
import ReactLoading from 'react-loading'; 

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
    pin:'',
  });
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true); // Activate loader
    try {
        const data = await getPatientDetails();
        setTestData(data);
    } catch (error) {
        console.error("Error fetching patient data:", error);
    } finally {
        setLoading(false); // Deactivate loader
    }
};

  const handleFieldChange = (event) => {
    setSelectedField(event.target.value);
  };

  const handlePinChange = (event) => {
    const query = event.target.value;
    setQueryByPIN(query);
  }

  const handlePinContact = (event) => {
    const query = event.target.value;
    setQueryByContact(query);
  }

  const handlePinCnic = (event) => {
    const query = event.target.value;
    setQueryByCNIC(query);
  }

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

  const filteredData = selectedField === "PIN"
    ? testData.filter(data => data.pin.includes(queryByPIN))
    : (selectedField === "CONTACT"
      ? testData.filter(data => data.mobileNumber.includes(queryByContact))
      : testData.filter(data => data.cnic.includes(queryByCNIC))
    )

  return (
    <div id="SearchTest">
         {loading && ( // Display loader if loading state is true
                <div className="loader-container">
                    <ReactLoading type={"bars"} color={"#03fc4e"} height={100} width={100} />
                </div>
            )}
      <div className="SearchTest-innerComponent">
        <div className="Search-Container" style={{width:"100%"}}>
          <p>Search Here</p>
          <div className="Search-Main">
            <div className="Search-Content">
              <label>Search By PIN</label>
              <div className="ViewPat-search-input">
                <input type="radio" value="PIN" checked={selectedField === 'PIN'} onChange={handleFieldChange} className="ViewPat-search-radio" />
                <input type="text" name="search-by-pin" placeholder="Search" className="ViewPat-search-text" disabled={selectedField !== 'PIN'} onChange={handlePinChange} value={queryByPIN} />
              </div>
            </div>
            <div className="Search-Content">
              <label>Search By Contact #</label>
              <div className="ViewPat-search-input">
                <input type="radio" value="CONTACT" checked={selectedField === 'CONTACT'} onChange={handleFieldChange} className="ViewPat-search-radio" />
                <input type="text" name="search-by-pin" placeholder="Search" className="ViewPat-search-text" disabled={selectedField !== 'CONTACT'} onChange={handlePinContact} value={queryByContact} />
              </div>
            </div>
            <div className="Search-Content">
              <label>Search By CNIC</label>
              <div className="ViewPat-search-input">
                <input type="radio" value="CNIC" checked={selectedField === 'CNIC'} onChange={handleFieldChange} className="ViewPat-search-radio" />
                <input type="text" name="search-by-pin" placeholder="Search" className="ViewPat-search-text" disabled={selectedField !== 'CNIC'} onChange={handlePinCnic} value={queryByCNIC} />
              </div>
            </div>
          </div>
        </div>
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
      </div>
      <button type="button" id="searchTest-btn" onClick={handleGenerateToken} disabled={selectedPatient.pin== "" ? true: false} style={selectedPatient.pin== "" ? { display: "none" } : {}}>Select Test</button>
    </div>
  );
};

export default SearchPatient;
