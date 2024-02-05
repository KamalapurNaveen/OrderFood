import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/customer/Login';
import Signup from './pages/customer/SignUp';
import Home from './pages/Home';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customer/signin" element={< Login />} />
          <Route path="/customer/signup" element={< Signup/>} />
         
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
