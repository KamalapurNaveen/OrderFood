// YourComponent.js
import React from 'react';
import { Link } from 'react-router-dom';

const YourComponent = () => {
  return (
    <div className="container-fluid vh-100">
      <div className="row d-flex align-items-center justify-content-center vh-100">
        <div className="col-md-6 col-lg-3  col-sm-10 shadow p-3 mb-5 bg-white rounded text-center" >
          {/* Set the desired height in the style attribute using vh */}
          <h2 className="mb-4">Admin Login</h2>
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
        </div>
      </div>
    </div>
  );
};

export default YourComponent;
