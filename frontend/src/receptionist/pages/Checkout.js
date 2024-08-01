import React, { useState, useRef, useEffect } from "react";
import "../CSS/Checkout.css";
import { useReactToPrint } from "react-to-print";
import DatePicker from "react-datepicker";
import { TbCalendarPlus } from "react-icons/tb";
import { getSales, addSalesData } from "../../Services/API";
import Modal from "react-modal";

// Set the app element for the modal
Modal.setAppElement('#root');

function CheckOut() {
  const [date, setDate] = useState(null);
  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);
  const [salesData, setSalesData] = useState(null);
  const [closingNumber, setClosingNumber] = useState(''); // State for closing number
  const [modalIsOpen, setModalIsOpen] = useState(false); // State for modal visibility
  const [remarks, setRemarks] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const componentRef = useRef();
  const datePickerRef = useRef(null); // Ref for "From Date" picker

  const Print = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    let pr = "yes";
    if (pr === "yes") {
      Print();
    }
  };

  useEffect(() => {
    getReceptionistData();
  }, []);

  useEffect(() => {
    if (user && date) {
      fetchSales();
      const formattedDate = new Date(date);
      const day = String(formattedDate.getDate()).padStart(2, '0'); // Extract day and format it to 2 digits
      const existingClosingNumber = getExistingClosingNumber(day);
      if (existingClosingNumber) {
        setClosingNumber(existingClosingNumber);
      } else {
        const newClosingNumber = generateIncrementedNumber(day);
        setClosingNumber(newClosingNumber);
        storeClosingNumber(day, newClosingNumber);
      }
    }
  }, [user, date]);

  const fetchSales = async () => {
    try {
      const response = await getSales(user, date);
      console.log(response.data);
      setSalesData(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("No data found for the selected date.");
        setSalesData(null);
        setModalIsOpen(true); // Open the modal when no data is found
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  const getReceptionistData = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      console.log("The user data is:", parsedUserData);
      setUser(parsedUserData.userName);
      setName(parsedUserData.name);
      console.log('user is:', user);
    }
  };

  const formatToDatabaseDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleFromDateChange = (date) => {
    if (date) {
      setDate(formatToDatabaseDate(date));
    } else {
      setDate(null);
    }
  };

  // Function to generate an incremented number with the day prefix
  const generateIncrementedNumber = (day) => {
    let currentNumber = localStorage.getItem(`closingNumber_${user}_${day}`);
    
    if (!currentNumber) {
      currentNumber = 1; // Start from 0 if no number is found
    } else {
      currentNumber = parseInt(currentNumber.substring(2), 10) + 1; // Increment only the last 3 digits
    }
  
    // Ensure the number has at least 3 digits by padding with leading zeros
    const incrementedPart = String(currentNumber).padStart(3, '0');
    const formattedNumber = day + incrementedPart;
  
    return formattedNumber;
  };

  // Function to get an existing closing number from localStorage
  const getExistingClosingNumber = (day) => {
    const key = `closingNumber_${user}_${day}`;
    return localStorage.getItem(key);
  };

  // Function to store the closing number in localStorage
  const storeClosingNumber = (day, number) => {
    const key = `closingNumber_${user}_${day}`;
    localStorage.setItem(key, number);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleRemarksChange = (event) => {
    setRemarks(event.target.value);
  };

  const handleSave = async () => {
    try {
      // Prepare the data to be saved
      const saveSalesData = {
        user,
        date,
        closingNumber,
        totalTokens: salesData.totalTokens,
        totalAmount: salesData.totalAmount,
        remarks
      };
  
      // Replace `saveSalesData` with your API function
      const response = await addSalesData(saveSalesData);
      console.log('the response of saving sales data is: ', response);
      if (response.data.message === true) {
        setIsSaved(true); // Set isSaved to true upon successful save
        alert('Data saved successfully!');
      } else {
        alert('Data already saved!');
      }
    } catch (error) {
      console.error("An error occurred while saving the data:", error);
      alert('Failed to save data.');
    }
  };
  
  return (
    <div className="checkout-container">
      <div className="checkout-top-container">
        <p className="checkout-heading">Cash Closing</p>
        <div
          style={{
            width: "20%",
            height: "2rem",
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid black",
            justifyContent: "space-between",
          }}
        >
          <DatePicker
            className="custom-datepicker"
            placeholderText="Select Date"
            selected={date ? new Date(date) : null}
            onChange={handleFromDateChange}
            dateFormat="MM/dd/yyyy"
            isClearable
            showYearDropdown
            ref={datePickerRef}
          />
          <TbCalendarPlus style={{ marginLeft: "0.2rem", cursor: "pointer", color: "#22CAB8" }} />
        </div>
      </div>

      <div ref={componentRef} id="sales-report" className="checkout-main">
        <div
          id="sales-report-hospital-details"
          className="checkout-hsopital-info"
        >
          <h1>Guloona+7 Diagnostic Centre</h1>
          <p>Opposite Cat A Hospital DHQ Batkhela,</p>
          <p>Malakand (KPK)</p>
        </div>

        <p className="checkout-middle-heading">Daily Sales Deposit Slip</p>

        <div className="checkout-staff-container">
          <div className="checkout-staff-info">
            <span className="checkout-staff-details">
              <p className="labels">Cashier:</p>
              <p>{name}</p>
            </span>
            <span className="checkout-staff-details">
              <p className="labels">Closing #:</p>
              <p>{closingNumber}</p>
            </span>
          </div>
          <div className="checkout-staff-info">
            <span className="checkout-staff-details">
              <p className="labels">From:</p>
              <p>{date}</p>
            </span>
            <span className="checkout-staff-details">
              <p className="labels">To:</p>
              <p>{date}</p>
            </span>
          </div>
          <div className="checkout-staff-info">
            <span className="checkout-staff-details">
              <p className="labels">Deposit Date:</p>
              <p>{date}</p>
            </span>
            <span className="checkout-staff-details">
              <p className="labels">Closed On:</p>
              <p>{date}</p>
            </span>
          </div>
        </div>

        <div className="checkout-sales-info">
          {salesData ? (
            <table className="checkout-sales-table">
              <thead>
                <tr className="checout-table-row">
                  <th>Sr.# Account</th>
                  <th>Total Tokens</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Guloona+7 Cash Sales</td>
                  <td>{salesData.totalTokens}</td>
                  <td>{salesData.totalAmount}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>No data available for the selected date.</p>
          )}
        </div>

        <div className="checkout-total-sales">
          <p>Total Amount:</p>
          <p>{salesData ? salesData.totalAmount : 'N/A'}</p>
        </div>
        <div className="checkout-remarks-container">
          <p>Remarks: </p>
          <textarea
          rows={2}
          value={remarks}
          onChange={handleRemarksChange}
        ></textarea>
        </div>
        <div className="checkout-footer-container">
          <span className="checkout-footer-sign">
            <p>Sign: </p>
            <p></p>
          </span>
          <span>
            <p>Dated: </p>
            <p>{date}</p>
          </span>
        </div>
      </div>
      <div className="checkout-button-container">
        {!isSaved && <button onClick={handleSave}>Save</button>} {/* Conditionally render Save button */}
        {isSaved && <button onClick={handlePrint}>Print</button>} {/* Conditionally render Print button */}
      </div>

      {/* Modal for no data found */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="No Data Found"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <p>No data is available for the selected date. Please select a different date.</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default CheckOut;
