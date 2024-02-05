import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/canteener/Login';
import Home from './components/Home';
import SignIn from './components/customer/SignIn';
import Signup from './components/customer/SignUp';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customer/signin" element={< SignIn />} />
          <Route path="/customer/signup" element={< Signup/>} />
          <Route path="canteener/login" element={<Login/>}/>
          {/* Add additional routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
