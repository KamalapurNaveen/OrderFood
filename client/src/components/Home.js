// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container text-center">
      <div className="row mt-5">
        <div className="col-md-8 offset-md-2 d-flex flex-column align-items-center">
          <h1 className="display-4 mb-4 text-primary">Welcome to Foodie Delight</h1>
          <p className="lead">
            Discover a delightful culinary experience with our diverse menu. From appetizers
            to desserts, we've got you covered.
          </p>
          <div className="mb-3">
            <Link
              to="/customer/signin"
              className="btn btn-primary btn-lg btn-block"
            >
              Explore as Customer
            </Link>
          </div>
          <div>
            <Link
              to="/canteener/login"
              className="btn btn-secondary btn-lg btn-block"
            >
              Access Admin Dashboard
            </Link>
          </div>
          <p className="mt-4 text-muted">
            Ready to place an order? Click "Explore as Customer" to get started. Canteen
            administrators can access the admin dashboard by clicking "Access Admin
            Dashboard."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
