import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { ErrorPage } from './ErrorPage';

import HomePage from './pages/HomePage';
import CustomerLogin from './pages/customer/Login';
import CustomerSignup from './pages/customer/SignUp';
import {CustomerNavProvider} from './pages/customer/NavContext'
import EmployeeLogin from "./pages/employee/Login";
import EmployeeDashboard from './pages/employee/Dashboard';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './pages/customer/ForgotPassword';
import Unauthorized from './Unauthorized';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/customer/signin" element={< CustomerLogin />} />
            <Route path="/customer/signup" element={< CustomerSignup/>} />
            <Route path="/customer/forgotpassword" element={< ForgotPassword/>} />
            <Route path="/customer" element={<PrivateRoute Component={CustomerNavProvider} role="customer" />} />
            <Route path="/employee/signin" element={< EmployeeLogin />} />
            <Route path="/employee/dashboard" element={<PrivateRoute Component={EmployeeDashboard} role="employee" />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<ErrorPage/>}/>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
