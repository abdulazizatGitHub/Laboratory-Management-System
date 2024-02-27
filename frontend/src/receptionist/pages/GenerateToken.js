import React, { useState, useEffect } from "react";
import NamingBar from "../components/NamingBar";
import "../CSS/GenerateToken.css";
import { useLocation } from "react-router-dom";
import { getGeneratedToken, saveToken } from "../../Services/API";

const GenerateToken = () => {
  const location = useLocation();
  let patientData = location.state?.patientData;
  let selectedTests = location.state?.selectedTests;
  
  const[buttonPress,setButtonPress] = useState(false);
  const[pin,setPin] = useState(null);
  const [tokenNumber, setTokenNumber] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0); 
  const [grandTotal, setGrandTotal] = useState(0);
  const [generatedTokenData, setGeneratedTokenData] = useState('');
  
  useEffect(() => {
    fetchAllGeneratedTokens();
  }, []);
  
 

  useEffect(()=>{
   console.log("value of button pressend : ", buttonPress)
    generateToken();
    
  },[generatedTokenData])

  const fetchAllGeneratedTokens = async () => {
    const generatedTokens = await getGeneratedToken();
    setGeneratedTokenData(generatedTokens);
    
  };
  
  const generateToken = () => {
    try {
      const currentDate = new Date();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    
    let storedDate = localStorage.getItem('currentDate');
    let storedDay = storedDate ? new Date(storedDate).getDate().toString() : null; // Ensure storedDay is a string
    if (!storedDay) {
        localStorage.setItem('currentDate', currentDate.toISOString().slice(0, 10)); // Store current date in ISO 8601 format
        storedDay = day.toString(); // Ensure storedDay is a string
      }
      
      let counter = 1;

    if (generatedTokenData.length > 0) {
        const existing_tc = parseInt(generatedTokenData[generatedTokenData.length - 1].tokenNumber.slice(-3));
        console.log("EX ", existing_tc, " and ", typeof(existing_tc));
        // localStorage.setItem('tokenCounter', existing_tc + 1);
        counter= existing_tc + 1;
    }
    
    
    if (storedDay !== day) {
        console.log(" stoday ", typeof (storedDay), " and day ", typeof (day));
        counter=1;
        localStorage.setItem('currentDate', currentDate.toISOString().slice(0, 10)); // Store current date in ISO 8601 format
    }
    
    // Create a counter to keep track of the token number
    const formattedCounter = ('000' + counter).slice(-3);

    
    // Construct the token number with the specified format
    const locationAbbreviation = 'BTK'; // Replace with your actual location logic or state
    let newTokenNumber = `${locationAbbreviation}-${month}${day}-${formattedCounter}`;
    
    // Check if the generated token number already exists
    
    console.log("The token number is f", newTokenNumber);
    // Update the counter for the next token number
    
    // Set the generated token number in the state
    setTokenNumber(newTokenNumber);
      //te grand total based on selected tests and discount
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
    let printContents = document.getElementById('generateToken-innerComponent').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
   document.body.innerHTML = originalContents; 
    
    const currentDate = new Date();
    const formattedDateTime = currentDate.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
    
    const tokenData = {
      tokenNumber,
      patientData,
      tests: selectedTests,
      grandTotal,
      dateTime: formattedDateTime,
      generatedBy: JSON.parse(localStorage.getItem('user')).userName,
      state:"generated",
      remark:""
    };
    
    
    saveToken(tokenData)
      .then(response => {
        console.log('Token saved successfully:', response);
        patientData.pin=null;
       
       handleOneTime();

        window.alert('Token saved successfully!');
      })
      .catch(error => {
        console.error('Error saving token:', error);
      });
  };
  
  const currentDateTime = new Date().toLocaleString();
  
const handleOneTime=()=>{
  if(patientData.pin==null || selectedTests.length==0)
  {
    setButtonPress(true);
  }
}

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
      <button type="Submit" id="generateToken-btn" onClick={saveTokenData} disabled={buttonPress} style={buttonPress ? { display:"none" } : {}}>Print</button>
      {/* <button type="button" id="generateToken-btn" onClick={saveTokenData} disabled={handleOneTime}>Save Token Data</button> */}
    </div>
  );
};

export default GenerateToken;
