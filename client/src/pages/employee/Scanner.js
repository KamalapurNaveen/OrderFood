import React, { useState, useRef, useEffect } from 'react';
import QrReader from 'react-qr-scanner';
import { Row, Col, Modal, Button } from 'antd';

const Scanner = () => {
  const [result, setResult] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [scannerVisible, setScannerVisible] = useState(true); // Track visibility of scanner
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
        orderId: {orderId},
        customerName: 'John Doe',
        // Add more order details as needed
      };
      setOrderData(orderId);
      setShowModal(true);
      // Pause scanning when modal is displayed
      if (scannerRef.current) {
        scannerRef.current.pauseScan();
      }
      // Hide the scanner
      setScannerVisible(false);
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    // Resume scanning when modal is closed
    if (scannerRef.current) {
      scannerRef.current.resumeScan();
    }
    // Show the scanner
    setScannerVisible(true);
  };

  return (
    <>
      <Row justify="center" align="middle" className="mt-4" style={{ height: 'calc(100vh - 64px)' }}>
        <Col xs={24} md={12} lg={8}>
          {permissionGranted && scannerVisible && ( // Only render scanner if it's visible
            <QrReader
              ref={scannerRef}
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: '100%', maxHeight: '70vh' }} // Adjust size of the scanner
            />
          )}
        </Col>
      </Row>

      <Modal
        title="Order Details"
        visible={showModal}
        onCancel={handleModalClose}
        footer={[
          <Button key="cancel" onClick={handleModalClose}>
            Cancel
          </Button>,
          <Button key="delivered" type="primary" onClick={handleModalClose}>
            Delivered
          </Button>,
        ]}
        centered
        maskClosable={false}
        closable={false}
      >
        <p>Order ID: {orderData}</p>
        
        {/* Add more order details as needed */}
      </Modal>
    </>
  );
};

export default Scanner;
