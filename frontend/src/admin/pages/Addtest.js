import '../css/AddTestDetails.css';

function Addtest() {
  return (
    <div className="Test-Details-Main-Container">
      <div className="Test-Details-Container">
        <p className="Test-Details-Heading">Test Details</p>
        <div className="Test-Details">
          <div className="Left-Side-Details">
            <label for="fname">Code</label><br></br>
            <input type="text" id="Code" name="Code" placeholder="Enter test Code" /><br></br>

            <label for="fname">Price</label><br></br>
            <input type="text" id="price" name="price" placeholder="Enter Test Price" /><br></br>

          </div>

          <div className="Right-side-Details">
            <label for="fname">Name</label><br></br>
            <input type="name" id="name" name="name" placeholder="Enter Test Name" /><br></br>

            <label for="fname">Type</label><br></br>
            <input type="text" id="type" name="type" placeholder="Enter Type of Test" />
            
          </div>

        </div>

        <div className="Test-Details">
          <div className="Left-Side-Details">
            <label for="fname">Section</label><br></br>
            <input type="text" id="section" name="section" placeholder="Enter Section" /><br></br>

            <label for="fname">Sample Type</label><br></br>
            <input type="text" id="sampletype" name="sampletype" placeholder="Enter Sample type" />
          </div>

          <div className="Right-side-Details">
            <label for="fname">Sample Quantity</label><br></br>
            <input type="text" id="samplequantity" name="samplequantity" placeholder="Enter Sample Quantity" /><br></br>

            <label for="fname">Unit</label><br></br>
            <input type="text" id="unit" name="unit" placeholder="Enter Unit of Test" /><br></br>
          </div>
        </div>


        <div className="Normal-Test-Range-Container">
          <p>Normal Range Value</p>
          <div className="Normal-Test-Range-Details">
            <div className="Normal-Test-Range">
            <label htmlFor="normalRange">Male</label><br></br>
            <div className="Test-Range-Inputs">
              <input type="text" id="menRange" name="menRange" placeholder="From" />
              <input type="text" id="menRange" name="menRange" placeholder="To" />
            </div>
            </div>
            <div className="Normal-Test-Range">
            <label htmlFor="normalRange">Female</label><br></br>
            <div className="Test-Range-Inputs">
              <input type="text" id="menRange" name="menRange" placeholder="From" />
              <input type="text" id="menRange" name="menRange" placeholder="To" />
            </div>
            </div>
          </div>

          <div className="Right-side-Details">
          </div>
        </div>

        <div className="btn-container"><button className="Next-button" >Next</button></div>
      </div>



    </div>
  )
}
export default Addtest;