import React, { useState } from "react"
import NamingBar from "../components/NamingBar";
import '../CSS/PatientRegistration.css';


const PatientRegistration = ()=>{
    const [selectedImage, setSelectedImage] = useState(null); // Store selected image data

    const handleImageChange = (event) => {
      const imageFile = event.target.files[0];
      setSelectedImage(URL.createObjectURL(imageFile)); // Preview selected image
    };
  
   
    return(

        <div className="Main">
            
            <section className="Profile-Main-Container">
                
                <div className="Patient-Profile">
                <h2>Patient Details</h2> 
                     <div className="Patient-Personal-Profile">
                             <div className="left-side-Profile">
                             <label for="fname">Patient name</label><br></br>
                              <input type="text" id="fname" name="fname" placeholder="Enter Your Name" /><br></br>

                              <label for="fname">Gender</label><br></br>
                              <input type="text" id="fname" name="fname" placeholder="Enter Your Gender" />
                               </div>
                             
                               <div className="Right-side-Profile">
                             <label for="fname">Age</label><br></br>
                              <input type="text" id="fname" name="fname" placeholder="Enter Your Name" /><br></br>

                              <label for="fname">CNIC</label><br></br>
                              <input type="text" id="fname" name="fname" placeholder="Enter Your Gender" />
                               </div>
                     </div>
                      
                     <h2>Patient Contact Details</h2> 
                     <div className="Patient-contact">
                         <div className="left-side-Profile">
                     <label for="fname">Mobile Number</label><br></br>
                              <input type="text" id="fname" name="fname" placeholder="Enter Your Contact" /><br></br>

                              <label for="fname">Address</label><br></br>
                              <input type="text" id="fname" name="fname" placeholder="Enter Your Address" />

                     </div>

                     <div className="Right-side-Profile">
                     <label for="fname">Email</label><br></br>
                              <input type="text" id="fname" name="fname" placeholder="Enter Your Emal" /><br></br>

                           

                     </div>


                     </div>
                     
                     <h2>Contact Details</h2>     
                     <div className="Doctor-Contact">
                     <div className="left-side-Profile">
                     <label for="fname">Reff. Doctor</label><br></br>
                              <input type="text" id="fname" name="fname" placeholder="Enter Your Name" /><br></br>

                              <label for="fname">Internal Remarks</label><br></br>
                              <input type="text" id="fname" name="fname" placeholder="Enter Your Rmarks" />

                     </div>

                     <div className="Right-side-Profile">
                     <label for="fname">Patient Remarks</label><br></br>
                              <input type="text" id="fname" name="fname" placeholder="Enter Patient Remarks" /><br></br>

                           

                     </div>


                     </div>
                          
                    <button className="Next-button">Next</button> 
                </div>

              {/* <div className="Patient-Image">
        
              </div> */}
               
            </section>

        </div>
    )
}

export default PatientRegistration;