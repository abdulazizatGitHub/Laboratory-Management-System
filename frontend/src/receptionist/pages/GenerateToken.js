import React, { useState, useEffect } from "react";
import NamingBar from "../components/NamingBar";
import { useLocation } from "react-router-dom";
import '../CSS/GenerateToken.css';
import { fetchTokenCount, updateTokenCount } from "../../Services/API";

const GenerateToken = () => {
  const location = useLocation();
  const { patientData, selectedTests } = location.state;

  const [totalAmount, setTotalAmount] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
  const [pin, setPin] = useState('');
  const [tokenNumber, setTokenNumber] = useState('');

  useEffect(() => {
    let amount = 0;
    selectedTests.forEach((test) => {
      amount += test.total;
    });
    setTotalAmount(amount);

    // Fetch token count from the database
    fetchTokenCount()
      .then(tokenCount => generatePin(tokenCount))
      .catch(error => console.error('Error fetching token count:', error));

  }, [patientData, selectedTests]); // Include patientData in the dependency array

  const generatePin = (tokenCount) => {
    // Generate PIN
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const pinNumber = `${year}${month}-${(tokenCount + 1).toString().padStart(5, '0')}`;
    setPin(pinNumber);

    // Generate Token Number
    const tokenNumber = `Btk-${(tokenCount + 1).toString().padStart(5, '0')}`;
    setTokenNumber(tokenNumber);

    // Update token count in the database
    updateTokenCount()
      .then(() => console.log('Token count updated successfully'))
      .catch(error => console.error('Error updating token count:', error));
  };



  // Conditional rendering to ensure patientData is available before rendering
  if (!patientData) {
    return (
      <div>Loading...</div>
    );
  }

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
          <p className="PinAndToken">PIN: {pin}</p>
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
            <p className="userInfo-heading">Date</p>
            <p className="userInfo-text">{currentDate}</p>
          </div>
        </div>

        <div className="scrollable-table-container gToken-table-cnt">
          <table className="scrollable-table">
            <thead className="gToken-table-head">
              <tr>
                <th>Test Name</th>
                <th>Date and Time</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {selectedTests.map((test) => (
                <tr key={test.id}>
                  <td>{test.name}</td>
                  <td>{test.deliveryTime}</td>
                  <td>{test.price}</td>
                  <td>{test.discount}</td>
                  <td>{test.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div id="generateToken-subTotal">
          <hr style={{ width: "12em", margin: "0.5em 4em 0.5em 0px", border: "1px dashed #000000" }} />
          <p id="genToken-subTotal-text">Total: {totalAmount}</p>
        </div>
      </div>
      <button type="Submit" id="generateToken-btn" onClick={() => window.print()}>Print</button>
    </div>
  );
};

export default GenerateToken;
