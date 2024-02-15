import React,{useState} from "react";
import Sidebar from "../component/Sidebar";
import PhelobotnyRight from "./PhelobotnyRight";

const PhlebotomyMain=()=>{
    const [isMobileScreen, setIsMobileScreen] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isSideBar,setIsSideBar] = useState(false);

    
    return(
        <div id="mainContainer-receptionist">
            
         <div className="left-side-recep ">
        <Sidebar />            
        </div>

        <div className="right-side-recep">
        <PhelobotnyRight />
            
        </div>
    </div>
    )
}
export default PhlebotomyMain;