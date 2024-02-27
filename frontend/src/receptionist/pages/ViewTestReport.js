import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import NamingBar from "../components/NamingBar";
import "../CSS/ViewTestReport.css";
import { getPatientDetails, getTestReportDetails } from "../../Services/API";
const ViewTestReport = () => {

    const [queryByPIN, setQueryByPIN] = useState('');
    const [queryByContact, setQueryByContact] = useState('');
    const [queryByCNIC, setQueryByCNIC] = useState('');
    const [selectedField, setSelectedField] = useState("PIN");

    const [reportData, setReportData] = useState([]);

    const navigation = useNavigate();

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
        const response = await getTestReportDetails();
      console.log('The report data is: ', response.data);
        // Filter the data to include only today's data
        const todayData = response.data.filter(item => isToday(item.dateTime));
    
        console.log("Today's Patient Data is ", todayData);
        setReportData(response.data);
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
        navigation('/receptionist/view_test_report/ReportDetailsPage')
    }

    const filteredData = selectedField === "PIN"
    ? reportData.filter(data => data.patientDetails.pin && data.patientDetails.pin.includes(queryByPIN))
    : (selectedField === "CONTACT"
        ? reportData.filter(data => data.patientDetails.mobileNumber && data.patientDetails.mobileNumber.includes(queryByContact))
        : reportData.filter(data => data.patientDetails.cnic && data.patientDetails.cnic.includes(queryByCNIC))
    )

    


    return (<div id="ViewTestReport">
       <div style={{width:"95%"}}>
       <NamingBar name={"VIEW TEST REPORTS"} />
       </div>
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
                  <th>Status</th>
                  <th>Reciept</th>
                    </tr>
                </thead>
                <tbody >
                    {
                        filteredData.map((data) => (
                            <tr key={data._id}>
                                <td>{data.patientDetails.pin}</td>
                                <td>{data.tokenNumber}</td>
                                <td>{data.patientDetails.name}</td>
                                <td>{data.patientDetails.cnic}</td>
                                <td>{data.patientDetails.mobileNumber}</td>
                                <td>{data.dateTime}</td>
                                <td>{data.state}</td>
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