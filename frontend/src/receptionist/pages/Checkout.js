import react, { useState, useRef, useEffect } from "react";
import "../CSS/Checkout.css";
import { useReactToPrint } from "react-to-print";
import DatePicker from "react-datepicker";
import { TbCalendarPlus } from "react-icons/tb";
import { getSales } from "../../Services/API";
function CheckOut() {
  const [date, setDate] = useState(null);
  const [user, setUser] = useState(null);
  const [salesData, setSalesData] = useState('');
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
    getReceptionistID();
    if (date) {
      console.log('Formatted from date is:', date);
    }
  }, [date]);

  useEffect(() => {
    if (user && date) {
      fetchSales();
    }
  }, [user, date]);

  const fetchSales = async () => {
    const response = await getSales(user, date)
    console.log(response.data);
    setSalesData(response.data);
  }

  const getReceptionistID = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      console.log("The user data is:", parsedUserData);
      setUser(parsedUserData.userName);
      console.log('user is:', user);
    }
  }

  const formatToDatabaseDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  const handleFromDateChange = (date) => {
    if (date) {
      setDate(formatToDatabaseDate(date));
    } else {
      setDate(null);
    }
  }

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
              <p>abc</p>
            </span>
            <span className="checkout-staff-details">
              <p className="labels">Closing #:</p>
              <p>123</p>
            </span>
          </div>
          <div className="checkout-staff-info">
            <span className="checkout-staff-details">
              <p className="labels">From:</p>
              <p>abc</p>
            </span>
            <span className="checkout-staff-details">
              <p className="labels">To:</p>
              <p>123</p>
            </span>
          </div>
          <div className="checkout-staff-info">
            <span className="checkout-staff-details">
              <p className="labels">Deposit Date:</p>
              <p>abc</p>
            </span>
            <span className="checkout-staff-details">
              <p className="labels">Closed On:</p>
              <p>123</p>
            </span>
          </div>
        </div>

        <div className="checkout-sales-info">
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
        </div>

        <div className="checkout-total-sales">
          <p>Total Amount:</p>
          <p>{salesData.totalAmount}</p>
        </div>
        <div className="checkout-remarks-container">
          <p>Remarks: </p>
          <textarea rows={2}></textarea>
        </div>
        <div className="checkout-footer-container">
          <span className="checkout-footer-sign">
            <p>Sign: </p>
            <p></p>
          </span>
          <span>
            <p>Dated: </p>
            <p>19-Mar-2024</p>
          </span>
        </div>
      </div>
      <div className="checkout-button-container">
        <button onClick={handlePrint}>Print</button>
        <button>Save</button>
      </div>
    </div>
  );
}
export default CheckOut;
