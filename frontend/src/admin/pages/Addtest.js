import '../css/AddTestDetails.css';
import React, { useState } from 'react';
import { addTest } from '../../Services/API';

function Addtest() {
  const [test, setTest] = useState({
    code: '',
    name: '',
    type: '',
    price: '',
    section: '',
    sampleType: '',
    sampleQuantity: '',
    unit: '',
    normalRange: {
      male: { from: '', to: '' },
      female: { from: '', to: '' },
    },
  });

  // Function to handle input changes
  const handleChange = (e) => {
    setTest({ ...test, [e.target.name]: e.target.value });
  };

  // Function to handle normal range input changes
  const handleNormalRangeChange = (gender, field, value) => {
    setTest({
      ...test,
      normalRange: {
        ...test.normalRange,
        [gender]: {
          ...test.normalRange[gender],
          [field]: value
        }
      }
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await addTest(test); // Use the API function
      console.log(response); // Log the response from the server
      window.alert('Test details saved successfully!'); // Alert message for successful data saving
      // Optionally, you can redirect the user or show a success message
    } catch (error) {
      console.error('Error adding test details:', error);
      // Optionally, you can show an error message to the user
    }
  };
  
  return (
    <div className="Test-Details-Main-Container">
      <div className="Test-Details-Container">
        <p className="Test-Details-Heading">Test Details</p>
        <div className="Test-Details">
          <div className="Left-Side-Details">
            <label htmlFor="code">Code</label><br />
            <input type="text" id="code" name="code" value={test.code} onChange={handleChange} placeholder="Enter test Code" /><br />

            <label htmlFor="price">Price</label><br />
            <input type="text" id="price" name="price" value={test.price} onChange={handleChange} placeholder="Enter Test Price" /><br />
          </div>

          <div className="Right-side-Details">
            <label htmlFor="name">Name</label><br />
            <input type="name" id="name" name="name" value={test.name} onChange={handleChange} placeholder="Enter Test Name" /><br />

            <label htmlFor="type">Type</label><br />
            <input type="text" id="type" name="type" value={test.type} onChange={handleChange} placeholder="Enter Type of Test" />
          </div>
        </div>

        <div className="Test-Details">
          <div className="Left-Side-Details">
            <label htmlFor="section">Section</label><br />
            <input type="text" id="section" name="section" value={test.section} onChange={handleChange} placeholder="Enter Section" /><br />

            <label htmlFor="sampleType">Sample Type</label><br />
            <input type="text" id="sampleType" name="sampleType" value={test.sampleType} onChange={handleChange} placeholder="Enter Sample type" />
          </div>

          <div className="Right-side-Details">
            <label htmlFor="sampleQuantity">Sample Quantity</label><br />
            <input type="text" id="sampleQuantity" name="sampleQuantity" value={test.sampleQuantity} onChange={handleChange} placeholder="Enter Sample Quantity" /><br />

            <label htmlFor="unit">Unit</label><br />
            <input type="text" id="unit" name="unit" value={test.unit} onChange={handleChange} placeholder="Enter Unit of Test" /><br />
          </div>
        </div>

        <div className="Normal-Test-Range-Container">
          <p>Normal Range Value</p>
          <div className="Normal-Test-Range-Details">
            <div className="Normal-Test-Range">
              <label htmlFor="menRange">Male</label><br />
              <div className="Test-Range-Inputs">
                <input type="text" id="menRangeFrom" name="menRangeFrom" value={test.normalRange.male.from} onChange={(e) => handleNormalRangeChange('male', 'from', e.target.value)} placeholder="From" />
                <input type="text" id="menRangeTo" name="menRangeTo" value={test.normalRange.male.to} onChange={(e) => handleNormalRangeChange('male', 'to', e.target.value)} placeholder="To" />
              </div>
            </div>
            <div className="Normal-Test-Range">
              <label htmlFor="womenRange">Female</label><br />
              <div className="Test-Range-Inputs">
                <input type="text" id="womenRangeFrom" name="womenRangeFrom" value={test.normalRange.female.from} onChange={(e) => handleNormalRangeChange('female', 'from', e.target.value)} placeholder="From" />
                <input type="text" id="womenRangeTo" name="womenRangeTo" value={test.normalRange.female.to} onChange={(e) => handleNormalRangeChange('female', 'to', e.target.value)} placeholder="To" />
              </div>
            </div>
          </div>
        </div>

        <div className="btn-container">
          <button className="Next-button" onClick={handleSubmit}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Addtest;
