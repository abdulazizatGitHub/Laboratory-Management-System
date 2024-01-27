import React, { useState } from "react";
import NamingBar from "../components/NamingBar";
import "../CSS/SearchTest.css";

const SearchTest = () => {
  const [selectedField, setSelectedField] = useState('Name');
  const [queryByName, setQueryByName] = useState('');
  const [queryByCode, setQueryByCode] = useState('');
  const [testData, setTestData] = useState([
    { id:1,name: 'ABC 1', type: 'Chemistry', code: 'A', deliveryTime: '30 mins', price: 100.5, discount: '10%', total: 40 },
    { id:2,name: 'ABC 1', type: 'physics', code: 'A', deliveryTime: '30 mins', price: 100.5, discount: '10%', total: 40 },
    {id:3, name: 'XYX', type: 'Chemistry', code: 'B', deliveryTime: '30 mins', price: 100.5, discount: '10%', total: 40 },
    { id:4,name: 'LMN 1', type: 'Chemistry', code: 'C', deliveryTime: '30 mins', price: 100.5, discount: '10%', total: 40 },
    {id:5, name: 'FGH 1', type: 'Chemistry', code: 'D', deliveryTime: '30 mins', price: 100.5, discount: '10%', total: 40 },
    {id:6, name: 'IUY 1', type: 'Chemistry', code: 'E', deliveryTime: '30 mins', price: 100.5, discount: '10%', total: 40 },
    { id:7,name: 'ERT 1', type: 'Chemistry', code: 'F', deliveryTime: '30 mins', price: 100.5, discount: '10%', total: 40 },
    { id:8,name: 'BNM 1', type: 'Chemistry', code: 'g', deliveryTime: '30 mins', price: 100.5, discount: '10%', total: 40 },
    { id:9,name: 'rty 1', type: 'Chemistry', code: 'g', deliveryTime: '30 mins', price: 100.5, discount: '10%', total: 40 },
    { id:10,name: 'REW 1', type: 'Chemistry', code: 'h', deliveryTime: '30 mins', price: 100.5, discount: '10%', total: 40 },
    { id:11,name: 'REW 1', type: 'Chemistry', code: 'i', deliveryTime: '30 mins', price: 100.5, discount: '10%', total: 40 },
    { id:12,name: 'REW 1', type: 'Chemistry', code: 'k', deliveryTime: '30 mins', price: 100.5, discount: '10%', total: 40 },
    { id:13,name: 'REW 1', type: 'Chemistry', code: 'n', deliveryTime: '30 mins', price: 100.5, discount: '10%', total: 40 },
  ]);
  const [selectedData, setSelectedData] = useState([]);

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

  const handleRowCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;
    const row = testData.find((data) => data.id === id);
    if (isChecked) {
      setSelectedData((prevData) => [...prevData, row]);
    } else {
      setSelectedData((prevData) => prevData.filter((item) => item.id !== id));
    }
  };
  
  

  const handleGenerateToken = () => {
    console.log("Selected Data:", selectedData);
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
                  <th>Name</th>
                  <th>Type</th>
                  <th>Code</th>
                  <th>Delivery Time</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
             
{filteredData.map((data) => (
  <tr key={data.id}>
    <td>
      <input
        type="checkbox"
        onChange={(event) => handleRowCheckboxChange(event, data.id)}
        checked={selectedData.some((item) => item.id === data.id)}
      />
    </td>
    <td>{data.name}</td>
    <td>{data.type}</td>
    <td>{data.code}</td>
    <td>{data.deliveryTime}</td>
    <td>{data.price}</td>
    <td>{data.discount}</td>
    <td>{data.total}</td>
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
