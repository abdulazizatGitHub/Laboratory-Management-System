import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import NamingBar from "../components/NamingBar";
import "../CSS/ViewTestReport.css";
import { getPatientDetails, getTestReportDetails } from "../../Services/API";
import ReactLoading from 'react-loading';
const ViewTestReport = () => {

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

    const isToday = (someDate) => {
        const today = new Date();
        const date = today.getDate();
const month = today.getMonth() + 1; 
const year = today.getFullYear();

const generatedDateTime = `${year}-${('0' + month).slice(-2)}-${('0' + date).slice(-2)}`;

        const dat = someDate;
        if(generatedDateTime === dat)
        return true;
        
    }
    
    const fetchdata = async () => {
      setLoading(true); // Activate loader
      try {
          const response = await getTestReportDetails();
          const todayData = response.data.filter(item => isToday(item.dateTime));
          setReportData(todayData);
      } catch (error) {
          console.error("Error fetching test reports: ", error);
      } finally {
          setLoading(false); // Deactivate loader
      }
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


    const handleReceipt = (data) => {
        navigation('/receptionist/view_test_report/ReportDetailsPage', { state: { data } });
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
                                <td>{data.dateTime +" "+data.time}</td>
                                <td>{data.state}</td>
                                <td><button style={{cursor: 'pointer'}} type="submit" id="ViewTestReport-roundButton" onClick={()=>handleReceipt(data)}>Receipt</button></td>
                            </tr>
                        ))

                    }
                </tbody>
            </table>
        </div>
    </div>)
}

export default ViewTestReport;