import React, { useState, useEffect } from "react";
import NamingBar from "../components/NamingBar";
import "../CSS/GenerateToken.css";
import { useLocation } from "react-router-dom";
import { getGeneratedToken, saveToken } from "../../Services/API";

const GenerateToken = () => {
  const location = useLocation();
  const patientData = location.state?.patientData;
  const selectedTests = location.state?.selectedTests;

  const [tokenNumber, setTokenNumber] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0); 
  const [grandTotal, setGrandTotal] = useState(0);
  const [generatedTokenData, setGeneratedTokenData] = useState('');

  useEffect(() => {
    fetchAllGeneratedTokens();
  }, []);

  const fetchAllGeneratedTokens = async () => {
    const generatedTokens = await getGeneratedToken();
    setGeneratedTokenData(generatedTokens);
    generateToken(generatedTokens.length);
  };
  
  const generateToken = (tokenCount) => {
    try {
      const currentDate = new Date();
      const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
      const day = ('0' + currentDate.getDate()).slice(-2);
  
      // Check if the date has changed
      if (localStorage.getItem('currentDate') !== currentDate.toDateString()) {
        // If the date has changed, reset the counter to 1
        localStorage.setItem('tokenCounter', '1');
        localStorage.setItem('currentDate', currentDate.toDateString());
      }
  
      // Create a counter to keep track of the token number
      let counter = parseInt(localStorage.getItem('tokenCounter')) || 1;
  
      // Format the counter with leading zeros
      const formattedCounter = ('000' + counter).slice(-3);
  
      // Construct the token number with the specified format
      const locationAbbreviation = 'BTK'; // Replace with your actual location logic or state
      let newTokenNumber = `${locationAbbreviation}-${month}${day}-${formattedCounter}`;
  
      // Check if the generated token number already exists
      if (generatedTokenData.length > 0) {
        const existingTokens = generatedTokenData.map(Gtok => Gtok.tokenNumber);
        while (existingTokens.includes(newTokenNumber)) {
          counter++; 
          const updatedFormattedCounter = ('000' + counter).slice(-3);
          newTokenNumber = `${locationAbbreviation}-${month}${day}-${updatedFormattedCounter}`;
        }
      }
      console.log("The token number is", newTokenNumber);
      // Update the counter for the next token number
      localStorage.setItem('tokenCounter', (counter + 1).toString());
  
      // Set the generated token number in the state
      setTokenNumber(newTokenNumber);
  
      // Calculate grand total based on selected tests and discount
      let totalPrice = 0;
      selectedTests.forEach(test => {
        totalPrice += test.price;
      });
  
      const discountedTotal = totalPrice * (1 - discountPercentage / 100);
      setGrandTotal(discountedTotal);
  
    } catch (error) {
      console.error('Error generating token:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };
  
  
  const saveTokenData = () => {
    const currentDate = new Date();
    const formattedDateTime = currentDate.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
    
    const tokenData = {
      tokenNumber,
      patientData,
      tests: selectedTests,
      grandTotal,
      dateTime: formattedDateTime
    };
    
    saveToken(tokenData)
      .then(response => {
        console.log('Token saved successfully:', response);
        window.alert('Token saved successfully!');
      })
      .catch(error => {
        console.error('Error saving token:', error);
      });
  };
  
  const currentDateTime = new Date().toLocaleString();
  
  return (
    <div className="generateToken-container">
      <NamingBar name={"GENERATE TOKEN"} />

      <div id="generateToken-innerComponent">
     
    <div>
      <div id="Lab-name-div">
        <p className="labNameAndTime">Siraj Shaheed</p>
        <p className="labNameAndTime">24/7</p>
      </div>
      <div id="generateToken-labInfo">
        <p className="labInfo">Diagnostic Center</p>
        <p className="labInfo">Batkhela</p>
      </div>
      <div id="generateToken-PinAndToken">
        <p className="PinAndToken">PIN: {patientData.pin}</p>
        <p className="PinAndToken">Token #: {tokenNumber}</p>
      </div>
      <div id="generateToken-userInfo">
        <div id="genToken-firstDiv">
          <p className="userInfo-heading">Name</p>
          <p className="userInfo-text">{patientData.name}</p>
          <p className="userInfo-heading">Age</p>
          <p className="userInfo-text">{patientData.age}</p>
          <p className="userInfo-heading">Gender</p>
          <p className="userInfo-text">{patientData.gender}</p>
        </div>
        <div id="genToken-secondDiv">
          <p className="userInfo-heading">Contact#:</p>
          <p className="userInfo-text">{patientData.mobileNumber}</p>
          <p className="userInfo-heading">Referred By:</p>
          <p className="userInfo-text">{patientData.refDoctor}</p>
          <p className="userInfo-heading">Date and Time</p>
          <p className="userInfo-text">{currentDateTime}</p>
        </div>
      </div>
    </div>
  

        <div className="scrollable-table-container gToken-table-cnt">
          <table className="scrollable-table">
            <thead className="gToken-table-head">
              <tr>
                <th>Code</th>
                <th>Test Name</th>
                <th>Type</th>
                <th>Sample Type</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {selectedTests.map((test) => (
                <tr key={test.id}>
                  <td>{test.code}</td>
                  <td>{test.name}</td>
                  <td>{test.type}</td>
                  <td>{test.sampleType}</td>
                  <td>{test.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div id="generateToken-subTotal">
          <hr style={{ width: "12em", margin: "0.5em 4em 0.5em 0px", border: "1px dashed #000000" }} />
          <p id="genToken-subTotal-text">Total: {grandTotal}</p>
        </div>
      </div>
      <button type="Submit" id="generateToken-btn" onClick={() => window.print()}>Print</button>
      <button type="button" id="generateToken-btn" onClick={saveTokenData}>Save Token Data</button>
    </div>
  );
};

export default GenerateToken;
