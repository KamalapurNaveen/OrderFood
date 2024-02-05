// Signup.js
import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
      <div className="col-md-6 col-lg-3 col-sm-10 shadow p-3 mb-5 bg-white rounded text-center">
        <h2 className="mb-4">Create an Account</h2>
        <form>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              required
            />
          </div>
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
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="tel"
              className="form-control"
              placeholder="Mobile Number"
              required
            />
          </div>
          <button type="submit" className="btn btn-success btn-block">
            Create Account
          </button>
        </form>
        <p className="mt-3">
          Already have an account?{' '}
          <Link to="/customer/signin" className="text-primary">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
