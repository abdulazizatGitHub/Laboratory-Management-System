import React, { useState, useEffect } from "react";
import NamingBar from "../components/NamingBar";
import "../CSS/SearchTest.css";
import { fetchtests } from "../../Services/API";
import { useLocation, useNavigate } from "react-router-dom";

const SearchTest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedField, setSelectedField] = useState('Name');
  const [queryByName, setQueryByName] = useState('');
  const [queryByCode, setQueryByCode] = useState('');
  const [testData, setTestData] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const tests = await fetchtests();
      if (tests.data && Array.isArray(tests.data)) {
        setTestData(tests.data);
      } else {
        console.error("Error fetching tests: data is not an array");
      }
    } catch (error) {
      console.error("Error fetching tests: ", error);
    }
  };

  const handleFieldChange = (event) => {
    setSelectedField(event.target.value);
  };

  const handleQueryChangeByName = (event) => {
    const value = event.target.value;
    setQueryByName(value);
  };

  const handleQueryChangeByCode = (event) => {
    const value = event.target.value;
    setQueryByCode(value);
  };

  const handleRowCheckboxChange = (event, code) => {
    const isChecked = event.target.checked;
    const row = testData.find((data) => data.code === code);
    if (isChecked) {
      setSelectedTests((prevTests) => {
        // Create a new array with the selected test added
        return [...prevTests, { ...row }];
      });
    } else {
      setSelectedTests((prevTests) => {
        // Filter out the test with the specified id
        return prevTests.filter((item) => item.code !== code);
      });
    }
  };
  

  const handleGenerateToken = () => {
    navigate("/receptionist/generate_token", {
      state: { patientData: location.state?.patientData, selectedTests: selectedTests },
    });
  };
  

  const filteredData = selectedField === 'Name'
    ? testData.filter(data => data.name.toLowerCase().includes(queryByName.toLowerCase()))
    : testData.filter(data => data.code.includes(queryByCode));


  return (
    <div id="SearchTest">
      <NamingBar name={"SEARCH TEST"} />
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
                  <th>Price</th>
                  <th>Sample Type</th>
                  <th>Sample Quantity</th>
                  <th>Unit</th>
                  <th>Male Normal Range (From)</th>
                  <th>Male Normal Range (To)</th>
                  <th>Female Normal Range (From)</th>
                  <th>Female Normal Range (To)</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((data) => (
                  <tr key={data.id}>
                    <td>
                    <input
                  type="checkbox"
                  onChange={(event) => handleRowCheckboxChange(event, data.code)}
                  checked={selectedTests.some((item) => item.code === data.code)}
                />
                    </td>
                    <td>{data.code}</td>
                    <td>{data.name}</td>
                    <td>{data.type}</td>
                    <td>{data.price}</td>
                    <td>{data.sampleType}</td>
                    <td>{data.sampleQuantity}</td>
                    <td>{data.unit}</td>
                    <td>{data.normalRange.male.from}</td>
                    <td>{data.normalRange.male.to}</td>
                    <td>{data.normalRange.female.from}</td>
                    <td>{data.normalRange.female.to}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <button type="button" id="searchTest-btn" onClick={handleGenerateToken}>Generate Token</button>
    </div>
  );
};

export default SearchTest;
