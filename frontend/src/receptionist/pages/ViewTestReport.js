import React, { useEffect, useState } from "react";
import NamingBar from "../components/NamingBar";
import "../CSS/ViewTestReport.css";
import { getGeneratedToken, getPatientDetails } from "../../Services/API";
const ViewTestReport = () => {

    const [queryByPIN, setQueryByPIN] = useState('');
    const [queryByContact, setQueryByContact] = useState('');
    const [queryByCNIC, setQueryByCNIC] = useState('');
    const [selectedField, setSelectedField] = useState("PIN");

    const [reportData, setReportData] = useState([]);

    useEffect(() => {
        fetchdata();
    }, []);

    const isToday = (someDate) => {
        const today = new Date();
        const date = new Date(someDate);
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    }
    
    const fetchdata = async () => {
        const data = await getGeneratedToken();
    
        // Filter the data to include only today's data
        const todayData = data.filter(item => isToday(item.dateTime));
    
        console.log("Today's Patient Data is ", todayData);
        setReportData(todayData);
    }
    

    const handleFieldChange = (event) => {
        setSelectedField(event.target.value);
      }

    const handlePinChange = (event) => {
        const query = event.target.value;
        setQueryByPIN(query);
    }

    const handlePinContact = (event) => {
        const query = event.target.value;
        setQueryByContact(query);
    }

    const handlePinCnic = (event) => {
        const query = event.target.value;
        setQueryByCNIC(query);
    }


    const handleReceipt = () => {
        console.log("Printing Receipt");
    }

    const filteredData = selectedField === "PIN"
    ? reportData.filter(data => data.patientData.pin && data.patientData.pin.includes(queryByPIN))
    : (selectedField === "CONTACT"
        ? reportData.filter(data => data.patientData.mobileNumber && data.patientData.mobileNumber.includes(queryByContact))
        : reportData.filter(data => data.patientData.cnic && data.patientData.cnic.includes(queryByCNIC))
    )

    


    return (<div id="ViewTestReport">
        <NamingBar name={"VIEW TEST REPORTS"} />
        <div className="Search-Container">
          <p>Search Here</p>
          <div className="Search-Main">
            <div className="Search-Content">
              <label>Search By PIN</label>
              <div className="ViewPat-search-input">
                <input type="radio" value="PIN" checked={selectedField === 'PIN'} onChange={handleFieldChange} className="ViewPat-search-radio" />
                <input type="text" name="search-by-pin" placeholder="Search" className="ViewPat-search-text" disabled={selectedField !== 'PIN'} onChange={handlePinChange} value={queryByPIN} />
              </div>
            </div>
            <div className="Search-Content">
              <label>Search By Contact #</label>
              <div className="ViewPat-search-input">
                <input type="radio" value="CONTACT" checked={selectedField === 'CONTACT'} onChange={handleFieldChange} className="ViewPat-search-radio" />
                <input type="text" name="search-by-pin" placeholder="Search" className="ViewPat-search-text" disabled={selectedField !== 'CONTACT'} onChange={handlePinContact} value={queryByContact} />
              </div>
            </div>
            <div className="Search-Content">
              <label>Search By CNIC</label>
              <div className="ViewPat-search-input">
                <input type="radio" value="CNIC" checked={selectedField === 'CNIC'} onChange={handleFieldChange} className="ViewPat-search-radio" />
                <input type="text" name="search-by-pin" placeholder="Search" className="ViewPat-search-text" disabled={selectedField !== 'CNIC'} onChange={handlePinCnic} value={queryByCNIC} />
              </div>
            </div>
          </div>
        </div>

        <div className="ViewTestReport-innerComponent TableDiv">
            <table className="ViewTestReport-Table">
                <thead id="ViewTestReport-TableHead">
                    <tr >

                  <th>PIN</th>
                  <th>Token No</th>
                  <th>Name</th>
                  <th>Cnic</th>
                  <th>Mobile Number</th>
                  <th>Date and Time</th>
                  <th>Total Price</th>
                  <th>Reciept</th>
                    </tr>
                </thead>
                <tbody >
                    {
                        filteredData.map((data) => (
                            <tr key={data._id}>
                                <td>{data.patientData.pin}</td>
                                <td>{data.tokenNumber}</td>
                                <td>{data.patientData.name}</td>
                                <td>{data.patientData.cnic}</td>
                                <td>{data.patientData.mobileNumber}</td>
                                <td>{data.dateTime}</td>
                                <td>{data.grandTotal}</td>
                                <td><button type="submit" id="ViewTestReport-roundButton" onClick={handleReceipt}>Receipt</button></td>
                            </tr>
                        ))

                    }
                </tbody>
            </table>
        </div>
    </div>)
}

export default ViewTestReport;