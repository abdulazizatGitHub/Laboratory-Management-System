import React,{useState,useEffect} from "react";
import "../css/AdminMain.css";
import Sidebar from "../components/Sidebar";
import AdminRight from "./AdminRight";


const AdminMain=()=>{
    const [isSideBar, setIsSideBar] = useState(true);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setIsSideBar(false);
      } else {
        setIsSideBar(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

    return(
        <div id="mainContainer-admin">
           
           {isSideBar && (
        <div className="left-side-recep">
          <Sidebar setIsSideBar={setIsSideBar} />
        </div>
      )}


            <div className="right-side-admin">
            <AdminRight setIsSideBar={setIsSideBar} />
            </div>
        </div>
    )
}
export default AdminMain;