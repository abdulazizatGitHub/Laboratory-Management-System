import react from "react";
import "../css/PatientDetailPage.css";
const PatientDetailPage = () => {
    
    return (<div id="patientDetailPage-Fullcontainer">
        <div id="pdp-nameAndButtons">
            <p id="pdp-name">Patient Detail</p>
           
                <button type="button" id="pdp-btn">Edit</button>
                <button type="button" id="pdp-btn">Delete</button>
            
        </div>
        <div id="pdp-container">
            <p className="pdp-heading">Personal Detail</p>
            <div className="pdp-details">
                    <div className="pdp-subBoxes">
                        <p className="pdp-smallHeading">Name: </p>
                        <p>Abdul AZiz</p>
                    </div>.

                    <div className="pdp-subBoxes">
                        <p className="pdp-smallHeading">Father Name: </p>
                        <p>Abdul AZiz</p>
                    </div>.

                    <div className="pdp-subBoxes">
                        <p className="pdp-smallHeading">Age: </p>
                        <p>22</p>
                    </div>.

                    
                    <div className="pdp-subBoxes">
                        <p className="pdp-smallHeading">Gender: </p>
                        <p>Male</p>
                    </div>.

                    
                    <div className="pdp-subBoxes">
                        <p className="pdp-smallHeading">CNIC: </p>
                        <p>12101-29867111</p>
                    </div>.
            </div>

            <p className="pdp-heading">Contact Detail</p>
            <div className="pdp-details">
                    <div className="pdp-subBoxes">
                        <p className="pdp-smallHeading">Contact#: </p>
                        <p>0300-0000010001</p>
                    </div>.

                    <div className="pdp-subBoxes">
                        <p className="pdp-smallHeading">Email: </p>
                        <p>ABC@gmail.com</p>
                    </div>.

                    <div className="pdp-subBoxes">
                        <p className="pdp-smallHeading">Address: </p>
                        <p>Abbottabad</p>
                    </div>                 
            </div>

            <p className="pdp-heading">Visiting Detail</p>
            <div className="pdp-details">
                    <div className="pdp-subBoxes">
                        <p className="pdp-smallHeading">Registration no: </p>
                        <p>01/01/2024, 1:45 AM</p>
                    </div>.

                    <div className="pdp-subBoxes">
                        <p className="pdp-smallHeading">Last visit on: </p>
                        <p>20/01/2024, 12:45 PM</p>
                    </div>.

                    <div className="pdp-subBoxes">
                        <p className="pdp-smallHeading">No of Visit: </p>
                        <p>04</p>
                    </div>.
                </div>


        </div>
    </div>)
}
export default PatientDetailPage;