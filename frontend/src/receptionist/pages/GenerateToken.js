import React, { useState, useEffect } from "react";
import NamingBar from "../components/NamingBar";
import { useLocation } from "react-router-dom";
import '../CSS/GenerateToken.css';
import { fetchTokenCount, getGeneratedToken, saveToken, updateTokenCount } from "../../Services/API";

const GenerateToken = () => {
  const location = useLocation();
  const { patientData, selectedTests } = location.state;

  const [tokenNumber, setTokenNumber] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0); 
  const [grandTotal, setGrandTotal] = useState(0);
  const [ generatedTokenData , setGeneratedTokenData] = useState('');

  useEffect(() => {
    fetchAllGeneratedTokens();
    fetchToken();
    
    }, []); // Run only once when the component mounts

    const fetchAllGeneratedTokens=async()=>{
      const generatedTokens= await getGeneratedToken();
      setGeneratedTokenData(generatedTokens);
      console.log("Generated Tokens in GenerateToken.js : ",generatedTokens)
    }

    const fetchToken = () => {
      fetchTokenCount()
        .then(tokenCount => {
          generatePin(tokenCount);
          console.log("Token Count is : ", tokenCount);
        })
        .catch(error => console.error('Error fetching token count:', error));
    };


  const generatePin = (tokenCount) => {
    
    let tokenNumber = `Btk-${(tokenCount + 1).toString().padStart(5, '0')}`;

    if (generatedTokenData.length > 0) {
      // Extract existing PINs from data
      const existingTokens = generatedTokenData.map(Gtok => Gtok.tokenNumber);
  
      // Generate a unique pin
      while (existingTokens.includes(tokenNumber)) {
        tokenCount++; 
        tokenNumber = `Btk-${(tokenCount + 1).toString().padStart(5, '0')}`;
      }
    }

    setTokenNumber(tokenNumber);

    // Calculate total price for all tests
    let totalPrice = 0;
    selectedTests.forEach(test => {
      totalPrice += test.price;
    });

    // Apply discount percentage
    const discountedTotal = totalPrice * (1 - discountPercentage / 100);
    setGrandTotal(discountedTotal);

    // Update token count in the database
    updateTokenCount()
      .then(() => console.log('Token count updated successfully'))
      .catch(error => console.error('Error updating token count:', error));


  };

  const saveTokenData = () => {
    // Save the token data
    const tokenData = {
      tokenNumber,
      patientData,
      tests: selectedTests,
      grandTotal,
      dateTime: new Date().toLocaleString()
    };
    saveToken(tokenData)
      .then(response => {
        console.log('Token saved successfully:', response);
        // Redirect or update UI after successful save
      })
      .catch(error => {
        console.error('Error saving token:', error);
        // Display error message or handle error
      });
  };


  // Calculate current date and time once
  const currentDateTime = new Date().toLocaleString();

  return (
    <div className="generateToken-container">
      <NamingBar name={"GENERATE TOKEN"} />

      <div id="generateToken-innerComponent">
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
