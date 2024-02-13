import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const ResponsiveComponent = ({ image, title, displayText, imagePosition, showButton ,user}) => {
  const [displayTextState, setDisplayTextState] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function


  const handleLogin = () => {
    // Navigate to the desired route when the login button is clicked
    if(user==="customer")
    navigate('/customer/signin'); 
    else navigate('/employee/signin')
  };

  return (
    <div style={{  borderRadius: '10px', padding: '20px' }}>
      <Container fluid>
        <Row>
          {imagePosition === 'left' && (
            <>
              <Col xs={12} md={6}>
                <motion.img
                  src={image}
                  alt="Image"
                  style={{ maxWidth: '40%', height: 'auto', border: '1px solid #ddd', borderRadius: '5px' }}
                  animate={{ rotate: [0, -5, 5, -5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </Col>
              <Col xs={12} md={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#007bff' }}>{title}</h2>
                  <h5 style={{ fontSize: '16px', marginBottom: '20px', color: '#666' }}>{displayText}</h5>
                  {showButton && <Button variant="primary" onClick={handleLogin}>Login</Button>}
                </div>
              </Col>
            </>
          )}
          {imagePosition === 'right' && (
            <>
              <Col xs={12} md={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#007bff' }}>{title}</h2>
                  <h5 style={{ fontSize: '16px', marginBottom: '20px', color: '#666' }}>{displayText}</h5>
                  {showButton && <Button variant="primary" onClick={handleLogin}>Login</Button>}
                </div>
              </Col>
              <Col xs={12} md={6} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <motion.img
                  src={image}
                  alt="Image"
                  style={{ maxWidth: '40%', height: 'auto', border: '1px solid #ddd', borderRadius: '5px' }}
                  animate={{ rotate: [0, -5, 5, -5, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
              </Col>
            </>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default ResponsiveComponent;
