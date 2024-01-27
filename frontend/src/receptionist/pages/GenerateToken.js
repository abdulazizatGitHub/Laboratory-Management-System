import React from "react"
import "../CSS/GenerateToken.css"
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import NamingBar from "../components/NamingBar";

const GenerateToken = ()=>{
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

            <hr style={{ margin: '0.5em 0', border: '1px solid #EFEFEF' }} />
            <div id="generateToken-tableHeadings">
                <p className="genTok-tHeading">Test Name</p>
                <p className="genTok-tHeading">Date and Time</p>
                <p className="genTok-tHeading">Price</p>
                <p className="genTok-tHeading">Discount</p>
                <p className="genTok-tHeading">Total</p>
            </div>
            <hr style={{ margin: '0.5em 0', border: '1px solid #EFEFEF' }} />
            <div style={{height:"200px",overflowY:"auto",overflowX:"auto"}}>
                <div className="genToken-row">
                    <p className="genToken-data">ABC</p>
                    <p className="genToken-data">Wednessday, Janurary 24 - 15:30 PM</p>
                    <p className="genToken-data">100.00</p>
                    <p className="genToken-data">10%</p>
                    <p className="genToken-data">40</p>
                </div>
                <div className="genToken-row">
                    <p className="genToken-data">ABC</p>
                    <p className="genToken-data">Wednessday, Janurary 24 - 15:30 PM</p>
                    <p className="genToken-data">100.00</p>
                    <p className="genToken-data">10%</p>
                    <p className="genToken-data">40</p>
                </div>
                <div className="genToken-row">
                    <p className="genToken-data">ABC</p>
                    <p className="genToken-data">Wednessday, Janurary 24 - 15:30 PM</p>
                    <p className="genToken-data">100.00</p>
                    <p className="genToken-data">10%</p>
                    <p className="genToken-data">40</p>
                </div>
                <div className="genToken-row">
                    <p className="genToken-data">ABC</p>
                    <p className="genToken-data">Wednessday, Janurary 24 - 15:30 PM</p>
                    <p className="genToken-data">100.00</p>
                    <p className="genToken-data">10%</p>
                    <p className="genToken-data">40</p>
                </div>
                <div className="genToken-row">
                    <p className="genToken-data">ABC</p>
                    <p className="genToken-data">Wednessday, Janurary 24 - 15:30 PM</p>
                    <p className="genToken-data">100.00</p>
                    <p className="genToken-data">10%</p>
                    <p className="genToken-data">40</p>
                </div>
            </div>

            <div id="generateToken-subTotal">
            <hr style={{ width:"12em",margin: '0.5em 4em 0.5em 0px', border: '1px dashed #000000' }} />
            <p id="genToken-subTotal-text">Total: 100000.500</p>
            </div>
        </div>
        <button type="Submit" id="generateToken-btn">Print</button>
    </div>)
}

export default GenerateToken;