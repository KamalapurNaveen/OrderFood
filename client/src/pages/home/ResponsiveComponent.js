import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const ResponsiveComponent = ({ image, title, displayText, imagePosition, showButton, user }) => {
  const [displayTextState, setDisplayTextState] = useState('');
  const [displayImageFirst, setDisplayImageFirst] = useState(true); // State to determine if image should be displayed first
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = () => {
    // Navigate to the desired route when the login button is clicked
    if (user === "customer")
      navigate('/customer/signin');
    else navigate('/employee/signin');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayTextState(prevText => {
        const newText = displayText.substring(0, prevText.length + 1);
        return newText.length === displayText.length ? displayText : newText;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [displayText]);

  useEffect(() => {
    // Set displayImageFirst based on imagePosition
    setDisplayImageFirst(imagePosition === 'left');
  }, [imagePosition]);

  return (
    <div style={{ marginBottom: '20px', border: '1px solid #ddd', borderRadius: '5px', overflow: 'hidden' }}>
      <Container fluid>
        <Row>
          {displayImageFirst ? (
            <>
              <Col xs={12} md={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.img
                  src={image}
                  alt="Image"
                  style={{ maxWidth: '40%', height: 'auto' }}
                  animate={{ rotate: [0, -5, 5, -5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </Col>
              <Col xs={12} md={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#007bff' }}>{title}</h2>
                  <h5 style={{ fontSize: '16px', marginBottom: '20px', color: '#666' }}>{displayText}</h5>
                  {showButton && <Button variant="primary" onClick={handleLogin}>Login</Button>}
                </div>
              </Col>
            </>
          ) : (
            <>
              <Col xs={12} md={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#007bff' }}>{title}</h2>
                  <h5 style={{ fontSize: '16px', marginBottom: '20px', color: '#666' }}>{displayText}</h5>
                  {showButton && <Button variant="primary" onClick={handleLogin}>Login</Button>}
                </div>
              </Col>
              <Col xs={12} md={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.img
                  src={image}
                  alt="Image"
                  style={{ maxWidth: '40%', height: 'auto' }}
                  animate={{ rotate: [0, -5, 5, -5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
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
