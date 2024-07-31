import react, { useState, useRef } from "react";
import "../CSS/Checkout.css";
import { useReactToPrint } from 'react-to-print';
function CheckOut() {
    const componentRef = useRef();
    const Print = useReactToPrint({
        content: () => componentRef.current,
    });

    const handlePrint = () => {
        let pr = "yes";
        if (pr === "yes") {
            Print();
        }
    }

  return (
    <div className="checkout-container">
      <p className="checkout-heading">Cash Closing</p>

      <div ref={componentRef} id="sales-report" className="checkout-main">
        <div id="sales-report-hospital-details" className="checkout-hsopital-info">
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
                    <td>50</td>
                    <td>1800</td>
                </tr>
            </tbody>
          </table>
        </div>

        <div className="checkout-total-sales">
          <p>Total Amount:</p>
          <p>1800</p>
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
