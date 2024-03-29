import React, { useEffect, useState } from 'react';
import './OrderFoodHomePage.css'; 
import CustomerOrderSteps from './CustomerOrderSteps';
import { Container } from 'react-bootstrap';
import EmployeeOrderSteps from './EmployeeOrderSteps';
import Main from './Main';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userRole } = useAuth()
  React.useEffect(()=>{
    if(Boolean(isAuthenticated)){
      if(userRole == "customer" ){
        navigate("/customer")
      }else{
        navigate('/employee/dashboard')
      }
    }
    
  },[])

  return (
      <>
      <Main/>
      <div className='container'>
      <Container fluid style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#007bff' ,margin:"30px"}}>Customer</h1>
      </Container>
      <CustomerOrderSteps/>
      <Container fluid style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#007bff' ,margin:"30px"}}>Employee</h1>
      </Container>
      <EmployeeOrderSteps/>
      </div>
      </>
    );
};

export default HomePage;
