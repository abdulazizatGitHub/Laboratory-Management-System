import React, { useEffect, useState } from "react";
import NamingBar from "../components/NamingBar";
import "../CSS/ViewTestReport.css";
import { useNavigate } from "react-router";
import { getAllTestReportDetails, getGeneratedToken, getPatientDetails } from "../../Services/API";
import ReactLoading from 'react-loading';
const SearchTestReport = () => {

    const [queryByPIN, setQueryByPIN] = useState('');
    const [queryByContact, setQueryByContact] = useState('');
    const [queryByCNIC, setQueryByCNIC] = useState('');
    const [selectedField, setSelectedField] = useState("PIN");

    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigate();

    useEffect(() => {
        fetchdata();
    }, []);

    const fetchdata = async () => {
      setLoading(true); // Activate loader
      try {
          const response = await getAllTestReportDetails();
  
          // Get the current date
          const today = new Date();
          // Get the first day of the current month
          const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
          // Get the last day of the current month
          const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
          // Filter the data to include only records within the current month
          const monthData = response.data.filter(item => {
              const itemDate = new Date(item.dateTime);
              return itemDate >= firstDayOfMonth && itemDate <= lastDayOfMonth;
          });
  
          console.log("Current Month's Patient Data is ", monthData);
          setReportData(response.data);
      } catch (error) {
          console.error("Error fetching test reports: ", error);
      } finally {
          setLoading(false); // Deactivate loader
      }
  };
  
    
    

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


    const handleReceipt = (data) => {
      navigation('/receptionist/search_test_report/ReportDetailsPage', { state: { data } });
  }

    const filteredData = selectedField === "PIN"
    ? reportData.filter(data => data.patientDetails.pin && data.patientDetails.pin.includes(queryByPIN))
    : (selectedField === "CONTACT"
        ? reportData.filter(data => data.patientDetails.mobileNumber && data.patientDetails.mobileNumber.includes(queryByContact))
        : reportData.filter(data => data.patientDetails.cnic && data.patientDetails.cnic.includes(queryByCNIC))
    )
    


    return (<div id="ViewTestReport">
        {loading && ( // Display loader if loading state is true
                <div className="loader-container">
                    <ReactLoading type={"bars"} color={"#03fc4e"} height={100} width={100} />
                </div>
            )}
    <div style={{width:"95%"}}>
        <NamingBar name={"Search Test Report"} />
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
            <table  className="ViewTestReport-Table">
                <thead id="ViewTestReport-TableHead">
                    <tr >

                  <th>PIN</th>
                  <th>Token No</th>
                  <th>Name</th>
                  <th>CNIC</th>
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
                                <td><button style={{cursor: 'pointer'}} type="submit" id="ViewTestReport-roundButton" onClick={() => handleReceipt(data)}>Receipt</button></td>
                            </tr>
                        ))

                    }
                </tbody>
            </table>
        </div>
    </div>)
}

export default SearchTestReport;