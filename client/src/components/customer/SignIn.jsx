// Login.js
import React from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { setAuthToken } from '../../utils/auth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('jwtToken', token);

      setAuthToken(token); // Set token in axios headers
   //   setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      // Handle login error
    }
  };
  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
      <div className="col-md-3  shadow p-3 mb-5 bg-white rounded text-center">
        <h2 className="mb-4">Customer Login</h2>
        <form>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
             
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </form>
        <p className="mt-3">
          New User?{' '}
          <Link to="/customer/signup" className="text-primary">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
