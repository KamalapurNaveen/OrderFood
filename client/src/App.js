import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ErrorPage from './ErrorPage';

import HomePage from './pages/home/HomePage';
import CustomerLogin from './pages/customer/Login';
import CustomerSignup from './pages/customer/SignUp';
import {CustomerNavProvider} from './pages/customer/NavContext'
import EmployeeLogin from "./pages/employee/Login";
import PrivateRoute from './PrivateRoute';
import CustomerForgotPassword from './pages/customer/ForgotPassword';
import EmployeeForgotPassword from './pages/employee/ForgotPassword';
import Unauthorized from './Unauthorized';
import { EmployeeNavProvider } from './pages/employee/NavContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/customer/signin" element={< CustomerLogin />} />
            <Route path="/customer/signup" element={< CustomerSignup/>} />
            <Route path="/customer/forgotpassword" element={< CustomerForgotPassword/>} />
            <Route path="/customer" element={<PrivateRoute Component={CustomerNavProvider} role="customer" />} />
            <Route path="/employee/signin" element={< EmployeeLogin />} />
            <Route path="/employee/forgotpassword" element={< EmployeeForgotPassword/>} />
            <Route path="/employee/dashboard" element={<PrivateRoute Component={EmployeeNavProvider} role="employee" />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<ErrorPage/>}/>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
