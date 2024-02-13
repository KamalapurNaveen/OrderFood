import React, { useEffect, useState } from 'react';
import './OrderFoodHomePage.css'; // Custom CSS for styling
import ResponsiveComponent from './ResponsiveComponent';
import eatImage from "./eat.png"
import CustomerOrderSteps from './CustomerOrderSteps';
import { Container } from 'react-bootstrap';
import EmployeeOrderSteps from './EmployeeOrderSteps';
const HomePage = () => {
  const [displayText, setDisplayText] = useState('');

 

  return (
    <>
    <div className="container-fluid homepage-container">
      <div className="row">
        <div className="col">
          <div className="background-image"></div>
          <div className="overlay"></div>
          <img src="logo.png" alt="Logo" className="logo" width="100" />
          <div className="content">
            <h1 className="title">QR-It</h1>
            <h2 className="subtitle">Order your favorite food online!</h2>
          </div>
        </div>
      </div>
    </div>
    <div className='container'>
    <Container fluid style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#007bff' }}>Customer</h1>
    </Container>
     <CustomerOrderSteps/>
     <Container fluid style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#007bff' }}>Employee</h1>
    </Container>
    <EmployeeOrderSteps/>
     </div>
    </>
  );
};

export default HomePage;
