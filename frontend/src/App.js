import logo from './logo.svg';
import './App.css';
import Sidebar from './receptionist/components/Sidebar';
import Navbar from './receptionist/components/Navbar';
import Dashboard from './receptionist/pages/Dashboard';

function App() {
  return (
    <div className="App">
      {/* <Sidebar /> */}
      {/* <Navbar /> */}
      <Dashboard />
    </div>
  );
}

export default App;
