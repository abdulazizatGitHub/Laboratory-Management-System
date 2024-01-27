import React , {useState,useEffect} from "react"
import "../CSS/GenerateToken.css"
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import NamingBar from "../components/NamingBar";

const GenerateToken = ()=>{
    const [testData, setTestData] = useState([
        { id:1,name: 'ABC 1', type: 'Chemistry', code: 'A', deliveryTime: 'Wednessday, Janurary 24 - 15:30 PM', price: 100.5, discount: '10%', total: 40 },
        { id:2,name: 'ABC 1', type: 'physics', code: 'A', deliveryTime: 'Wednessday, Janurary 24 - 15:30 PM', price: 100.5, discount: '10%', total: 40 },
        {id:3, name: 'XYX', type: 'Chemistry', code: 'B', deliveryTime: 'Wednessday, Janurary 24 - 15:30 PM', price: 100.5, discount: '10%', total: 40 },
        { id:4,name: 'LMN 1', type: 'Chemistry', code: 'C', deliveryTime: 'Wednessday, Janurary 24 - 15:30 PM', price: 100.5, discount: '10%', total: 40 },
        {id:5, name: 'FGH 1', type: 'Chemistry', code: 'D', deliveryTime: 'Wednessday, Janurary 24 - 15:30 PM', price: 100.5, discount: '10%', total: 40 },
        {id:6, name: 'IUY 1', type: 'Chemistry', code: 'E', deliveryTime: 'Wednessday, Janurary 24 - 15:30 PM', price: 100.5, discount: '10%', total: 40 },
        { id:7,name: 'ERT 1', type: 'Chemistry', code: 'F', deliveryTime: 'Wednessday, Janurary 24 - 15:30 PM', price: 100.5, discount: '10%', total: 40 },
        { id:8,name: 'BNM 1', type: 'Chemistry', code: 'g', deliveryTime: 'Wednessday, Janurary 24 - 15:30 PM', price: 100.5, discount: '10%', total: 40 },
        { id:9,name: 'rty 1', type: 'Chemistry', code: 'g', deliveryTime: 'Wednessday, Janurary 24 - 15:30 PM', price: 100.5, discount: '10%', total: 40 },
        { id:10,name: 'REW 1', type: 'Chemistry', code: 'h', deliveryTime: 'Wednessday, Janurary 24 - 15:30 PM', price: 100.5, discount: '10%', total: 40 },
        { id:11,name: 'REW 1', type: 'Chemistry', code: 'i', deliveryTime: 'Wednessday, Janurary 24 - 15:30 PM', price: 100.5, discount: '10%', total: 40 },
        { id:12,name: 'REW 1', type: 'Chemistry', code: 'k', deliveryTime: 'Wednessday, Janurary 24 - 15:30 PM', price: 100.5, discount: '10%', total: 40 },
        { id:13,name: 'REW 1', type: 'Chemistry', code: 'n', deliveryTime: 'Wednessday, Janurary 24 - 15:30 PM', price: 100.5, discount: '10%', total: 40 },
      ]);
        let [totalAmount,setTotalAmount]=useState(0);
      useEffect(()=>{
            let amount=0
            testData.map((d)=>{
                amount+=d.total
            })
            setTotalAmount(amount)
      },[])

    return(
        <div className="generateToken-container">
        
        <NamingBar name={"GENERATE TOKEN"} />

        <div id="generateToken-innerComponent">
            <div id="Lab-name-div">
                <p className="labNameAndTime">Siraj Shaheed</p>
                <p className="labNameAndTime">24/7</p>
            </div>
            <div id="generateToken-labInfo">
                <p className="labInfo">Diagnostic Center</p>
                <p className="labInfo">Batkhela</p>
            </div>
            <div id="generateToken-PinAndToken">
                <p className="PinAndToken">PIN: 2401-00001</p>
                <p className="PinAndToken">Token #: Btk-00001</p>
            </div>
             <div id="generateToken-userInfo">
                <div id="genToken-firstDiv">
                    <p className="userInfo-heading">Name</p>
                    <p className="userInfo-text">ABC</p>
                    <p className="userInfo-heading">Age</p>
                    <p className="userInfo-text">20 y</p>
                    <p className="userInfo-heading">Gender</p>
                    <p className="userInfo-text">Female</p>
                
                </div>
                <div id="genToken-secondDiv">
                    <p className="userInfo-heading">Contace#:</p>
                    <p className="userInfo-text">0345-0000889</p>
                    <p className="userInfo-heading">Refered By:</p>
                    <p className="userInfo-text">xyz</p>
                    <p className="userInfo-heading">Date</p>
                    <p className="userInfo-text">20/01/24</p>
                
                </div>
            </div>

           

            <div className="scrollable-table-container gToken-table-cnt">
            <table className="scrollable-table">
              <thead className="gToken-table-head">
                <tr>
                  
                  <th>Test Name</th>
                  <th>Date and Time</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
             
{testData.map((data) => (
  <tr key={data.id}>
    
    <td>{data.name}</td>
    <td>{data.deliveryTime}</td>
    <td>{data.price}</td>
    <td>{data.discount}</td>
    <td>{data.total}</td>
  </tr>
))}

              </tbody>
            </table>
          </div>

            <div id="generateToken-subTotal">
            <hr style={{ width:"12em",margin: '0.5em 4em 0.5em 0px', border: '1px dashed #000000' }} />
            <p id="genToken-subTotal-text">Total: {totalAmount}</p>
            </div>
        </div>
        <button type="Submit" id="generateToken-btn">Print</button>
    </div>)
}

export default GenerateToken;