import react from 'react';
import '../Assessts/Sidebar.css';
function Sidebar(){
    return(
        <div class="sidebar">
        <a href="#" class="active">LMS - Dashboard</a>
        <div class="dropdown">
          <button class="dropbtn">Registrations ▼</button>
          <div class="dropdown-content">
            <a href="#">Student Registration</a>
            <a href="#">Staff Registration</a>
          </div>
        </div>
        <div class="dropdown">
          <button class="dropbtn">Test Reports ▼</button>
          <div class="dropdown-content">
            <a href="#">Student Test Reports</a>
            <a href="#">Staff Test Reports</a>
          </div>
        </div>
        <a href="#">Account</a>
      </div>
    )
}
export default Sidebar;