import React, { useState, useEffect } from "react";
import NamingBar from "../components/NamingBar";
import "../CSS/SearchTest.css";
import { fetchtests } from "../../Services/API";
import { useLocation, useNavigate } from "react-router-dom";
import ReactLoading from 'react-loading';

const SearchTest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedField, setSelectedField] = useState('Name');
  const [queryByName, setQueryByName] = useState('');
  const [queryByCode, setQueryByCode] = useState('');
  const [testData, setTestData] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true); // Activate loader
    try {
      const tests = await fetchtests();
      if (tests.data && Array.isArray(tests.data)) {
        setTestData(tests.data);
      } else {
        console.error("Error fetching tests: data is not an array");
      }
    } catch (error) {
      console.error("Error fetching tests: ", error);
    } finally {
      setLoading(false); // Deactivate loader
    }
  };

  const handleFieldChange = (event) => {
    setSelectedField(event.target.value);
    // Reset queries when changing the search field
    setQueryByName('');
    setQueryByCode('');
  };

  const handleQueryChangeByName = (event) => {
    setQueryByName(event.target.value);
  };

  const handleQueryChangeByCode = (event) => {
    setQueryByCode(event.target.value);
  };

  const handleRowCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;
    const row = testData.find((data) => data._id === id);
    if (isChecked) {
      setSelectedTests((prevTests) => [...prevTests, row]);
    } else {
      setSelectedTests((prevTests) => prevTests.filter((item) => item._id !== id));
    }
  };

  const handleGenerateToken = () => {
    navigate("/receptionist/generate_token", {
      state: { 
        patientData: location.state?.patientData,
        selectedTests: selectedTests 
      },
    });
  };

  // Filtering data based on query
  const filteredData = selectedField === 'Name'
    ? queryByName ? testData.filter(data => data.name.toLowerCase().includes(queryByName.toLowerCase())) : []
    : queryByCode ? testData.filter(data => data.code.toLowerCase().includes(queryByCode.toLowerCase())) : [];

  return (
    <div id="SearchTest">
      {loading && (
        <div className="loader-container">
          <ReactLoading type={"bars"} color={"#03fc4e"} height={100} width={100} />
        </div>
      )}
      {/* <NamingBar name={"SEARCH TEST"} /> */}
      <div className="SearchTest-innerComponent">
        <form className="searchTest-mainBox">
          <div className="searchTest-searchDivs">
            <label className="searchTest-Text">By Name</label>
            <div className="searchTest-radio">
              <div className="searchTest-search-input">
                <input
                  type="radio"
                  value="Name"
                  checked={selectedField === 'Name'}
                  onChange={handleFieldChange}
                  className="searchTest-search-radio"
                />
                <input
                  style={{ height: "3rem", fontSize: "1rem" }}
                  type="text"
                  value={queryByName}
                  onChange={handleQueryChangeByName}
                  placeholder="Search"
                  disabled={selectedField !== 'Name'}
                  className="searchTest-search-text"
                />
              </div>
            </div>
          </div>

          <div className="searchTest-searchDivs">
            <label className="searchTest-Text">By Code</label>
            <div className="searchTest-radio">
              <div className="searchTest-search-input">
                <input
                  type="radio"
                  value="Code"
                  checked={selectedField === 'Code'}
                  onChange={handleFieldChange}
                  className="searchTest-search-radio"
                />
                <input
                  style={{ height: "3rem", fontSize: "1rem" }}
                  type="text"
                  value={queryByCode}
                  onChange={handleQueryChangeByCode}
                  placeholder="Search"
                  disabled={selectedField !== 'Code'}
                  className="searchTest-search-text"
                />
              </div>
            </div>
          </div>
        </form>

        <div className="searchTest-mainBox">
          <div className="scrollable-table-container">
            <table className="scrollable-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Sample Type</th>
                  <th>Price</th>
                  <th>Unit</th>
                  <th>Sample Quantity</th>
                  <th>Male Normal Range (From)</th>
                  <th>Male Normal Range (To)</th>
                  <th>Female Normal Range (From)</th>
                  <th>Female Normal Range (To)</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((data) => (
                    <tr key={data._id}>
                      <td>
                        <input
                          type="checkbox"
                          onChange={(event) => handleRowCheckboxChange(event, data._id)}
                          checked={selectedTests.some((item) => item._id === data._id)}
                        />
                      </td>
                      <td>{data.code}</td>
                      <td>{data.name}</td>
                      <td>{data.type}</td>
                      <td>{data.sampleType}</td>
                      <td>{data.price}</td>
                      <td>{data.unit}</td>
                      <td>{data.sampleQuantity}</td>
                      <td>{data.normalRange.male.from}</td>
                      <td>{data.normalRange.male.to}</td>
                      <td>{data.normalRange.female.from}</td>
                      <td>{data.normalRange.female.to}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" style={{ textAlign: 'center' }}>No results found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <button
        type="button"
        id="searchTest-btn"
        onClick={handleGenerateToken}
        disabled={selectedTests.length === 0}
        style={{ display: selectedTests.length === 0 ? "none" : "block" }}
      >
        Generate Token
      </button>
    </div>
  );
};

export default SearchTest;
