import React, { useState, useEffect } from "react";
import NamingBar from "../components/NamingBar";
import { useLocation, useNavigate } from "react-router-dom";
import { getPatientDetails } from '../../Services/API';
function SearchPatient(){
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedField, setSelectedField] = useState('Name');
    const [queryByPIN, setQueryByPIN] = useState('');
    const [queryByContact, setQueryByContact] = useState('');
    const [queryByCNIC, setQueryByCNIC] = useState('');
    const [testData, setTestData] = useState([]);
    const [selectedpatient, setselectedpatient] = useState([]);
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData =async()=>{
        const data= await getPatientDetails();
        setTestData(data);
    }

  
    const handleFieldChange = (event) => {
      setSelectedField(event.target.value);
    };
  
    const handlePinChange = (event) => {
        const query = event.target.value;
        setQueryByPIN(query)
    }

    const handlePinContact = (event) => {
        const query = event.target.value;
        setQueryByContact(query)
    }

    const handlePinCnic = (event) => {
        const query = event.target.value;
        setQueryByCNIC(query)
    }

  
    const handleRowCheckboxChange = (event, id) => {
      console.log(id)
      const isChecked = event.target.checked;
      const row = testData.find((data) => data._id === id);
      if (isChecked) {
        setselectedpatient((prevTests) => {
          // Create a new array with the selected test added
          return [...prevTests, { ...row }];
        });
      } else {
        setselectedpatient((prevTests) => {
          // Filter out the test with the specified id
          return prevTests.filter((item) => item._id !== id);
        });
      }
    };
    
    // const handlePatientSelect = (patient) => {
    //     setselectedpatient(patient);
    //   };

    const handleGenerateToken = () => {
        if (selectedpatient) {
          navigate("/receptionist/search_test",{ state: { selectedPatient: selectedpatient } });
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
    return( 
        <div id="SearchTest">

        <div className="SearchTest-innerComponent">
        <div className="Search-Container">
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
                    type="checkbox"
                    onChange={(event) => handleRowCheckboxChange(event, data._id)}
                    checked={selectedpatient.some((item) => item._id === data._id)}
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
        <button type="button" id="searchTest-btn" onClick={handleGenerateToken}>Select Test</button>
      </div>
    );
  };
              

export default SearchPatient;