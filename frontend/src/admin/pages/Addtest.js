function Addtest(){
    return(
        <div className="Patient-Main-Container">
        <div className="Patient-Details-Container">
          <h2>Test Details</h2>
          <div className="Personal-Details">
            <div className="left-side-Profile">
              <label for="fname">Code</label><br></br>
              <input type="number" id="Code" name="Code" placeholder="Enter test Code"  /><br></br>

              <label for="fname">Price</label><br></br>
              <input type="number" id="price" name="price" placeholder="Enter Test Price"  /><br></br>

            </div>
  
            <div className="Right-side-Profile">
              <label for="fname">Name</label><br></br>
              <input type="name" id="name" name="name" placeholder="Enter Test Name"  /><br></br>
  
              <label for="fname">Type</label><br></br>
              <input type="text" id="type" name="type" placeholder="Enter Type of Test"  />
            </div>
          </div>
  
          {/* <h2>Patient Contact Details</h2> */}
          <div className="Contact-Details">
            <div className="left-side-Profile">
              <label for="fname">Section</label><br></br>
              <input type="text" id="section" name="section" placeholder="Enter Section"  /><br></br>
  
              <label for="fname">Sample Type</label><br></br>
              <input type="text" id="sampletype" name="sampletype" placeholder="Enter Sample type"  />
            </div>
  
            <div className="Right-side-Profile">
              <label for="fname">Sample Quantity</label><br></br>
              <input type="Number" id="samplequantity" name="samplequantity" placeholder="Enter Sample Quantity" /><br></br>

              <label for="fname">Unit</label><br></br>
              <input type="Number" id="unit" name="unit" placeholder="Enter Unit of Test" /><br></br>
            </div>
          </div>
  
         
          <div className="Visit-Details">
            <div className="left-side-Profile">
            <label htmlFor="normalRange">Normal Range (Men)</label><br></br>
            <input type="text" id="menRange" name="menRange" placeholder="From ... to ..." /><br></br>

            <label htmlFor="normalRange">Normal Range (Female)</label><br></br>
            <input type="text" id="femaleRange" name="femaleRange" placeholder="From ... to ..." /><br></br>
  
            </div>
  
            <div className="Right-side-Profile">
              {/* <label for="fname">Patient Remarks</label><br></br>
              <input type="text" id="patientRemarks" name="patientRemarks" placeholder="Enter Patient Remarks" /><br></br> */}
            </div>
          </div>
          <div className="btn-container"><button className="Next-button" >Next</button></div>
        </div>
  
    
  
      </div>
    )
}
export default Addtest;