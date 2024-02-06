import React, { useState, useRef, useEffect } from 'react';
import QrReader from 'react-qr-scanner';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';

const Scanner = () => {
  const [result, setResult] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const scannerRef = useRef(null);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setPermissionGranted(true);
      // Start scanning if permission is granted
      if (scannerRef.current) {
        scannerRef.current.streamRef.current.srcObject = stream;
        scannerRef.current.startScan();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const handleScan = (data) => {
    if (data) {
      setResult(data.text);
      fetchOrderData(data.text);
    }
  };

  const handleError = (error) => {
    console.error(error);
    // If an error occurs during scanning, reset the result to resume scanning
    setResult('');
  };

  const fetchOrderData = async (orderId) => {
    try {
      // Fetch order data using orderId
      // For demonstration, use dummy order data
      const dummyOrderData = {
        orderId: '123456',
        customerName: 'John Doe',
        // Add more order details as needed
      };
      setOrderData(dummyOrderData);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <Container fluid>
      <Row className="justify-content-center mt-4">
        <Col xs={12} md={6} lg={4}>
          {permissionGranted && (
            <QrReader
              ref={scannerRef}
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: '100%' }}
            />
          )}
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Order ID: {orderData?.orderId}</p>
          <p>Customer Name: {orderData?.customerName}</p>
          {/* Add more order details as needed */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleModalClose}>
            Delivered
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Scanner;
