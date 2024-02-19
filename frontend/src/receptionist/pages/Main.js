import React,{useState,useEffect} from "react";
import Sidebar from "../components/Sidebar";
import Right from "./Right";
import "../CSS/Main.css"
const Main = () => {
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
    return (
        <div id="mainContainer-receptionist">

            {isSideBar && (
                <div className="left-side-recep">
                    <Sidebar setIsSideBar={setIsSideBar} />
                </div>
            )}


            <div className="right-side-recep">
                <Right setIsSideBar={setIsSideBar} />

            </div>
        </div>
    )
}

export default Main;