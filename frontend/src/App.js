import './App.css';
import Main from "./receptionist/pages/Main";
import { Route, Routes } from 'react-router';
import Login from './receptionist/pages/Login';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<Login />} />
        <Route path='/receptionist/*' element={<Main />} />
      </Routes>
      
    </div>
  );
}

export default App;
