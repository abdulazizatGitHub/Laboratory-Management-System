import React from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";

function Navbar({ setIsSideBar }) {
  const handleClickNav = () => {
    setIsSideBar((prev) => !prev);
  };

  return (
    <div className="navbar">
      <i className="fa fa-bars" style={{ color: "white" }} onClick={handleClickNav}></i>

      <div className="right-section">
        <Link className="navbar-icon" to="login">
          Login
        </Link>
        <span className="navbar-icon profile-icon" style={{ backgroundImage: "url(path_to_your_image)" }}>
          {/* You can replace 'path_to_your_image' with the actual path to your image */}
        </span>
      </div>
    </div>
  );
}

export default Navbar;


// import React from "react";
// import "../css/Navbar.css";
// import { Link } from "react-router-dom";

// function Navbar({ setIsSideBar }) {
//   const handleClickNav = () => {
//     setIsSideBar((prev) => !prev);
//   };

//   return (
//     <div className="navbar">
//       <i className="fa fa-bars" style={{ color: "white" }} onClick={handleClickNav}></i>

//       <div className="right-section">
//         <div className="dropdown">
//           <img
//             src="https://via.placeholder.com/50x50.png?text=ML"
//             alt="Profile"
//             className="round-icon"
//           />

//           <div className="dropdown-content">
//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <img
//                 src="https://via.placeholder.com/50x50.png?text=ML"
//                 alt="Profile"
//                 className="round-icon"
//               />
//               <div>
//                 <p style={{ margin: 0 }}>Mahad Khan</p>
//                 <p style={{ margin: 0, fontSize: '12px' }}>mk-hr613</p>
//               </div>
//             </div>
//             <div className="horizontal-line"></div>
//             <Link to="/sign-out">Sign out</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;
