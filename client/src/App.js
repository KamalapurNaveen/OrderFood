import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerLogin from './pages/customer/Login';
import CustomerSignup from './pages/customer/SignUp';
import CustomerDashboard from './pages/customer/Dashboard';
import EmployeeLogin from "./pages/employee/Login";
import EmployeeDashboard from './pages/employee/Dashboard';

import Home from './pages/Home';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customer/signin" element={< CustomerLogin />} />
          <Route path="/customer/signup" element={< CustomerSignup/>} />
          <Route path="/customer/dashboard" element={< CustomerDashboard/>} />
          <Route path="/employee/signin" element={< EmployeeLogin />} />
          <Route path="/employee/dashboard" element={< EmployeeDashboard/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
