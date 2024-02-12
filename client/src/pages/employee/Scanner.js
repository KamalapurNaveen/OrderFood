import React, { useState, useRef, useEffect } from 'react';
import QrReader from 'react-qr-scanner';
import { Row, Col, Modal, Button ,Tag, message} from 'antd';

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
      const response = await fetch(`http://localhost:3500/api/_e/order?id=${orderId}`,{credentials: "include"});

      const resData = await response.json();
      setOrderData(resData.data["order"]);
      console.log(resData.data["order"]);
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
  const renderStatusTag = (status) => {
    let color = 'blue';
    if (status === 'delivered') {
      color = 'green';
    } else if (status === 'cancelled') {
      color = 'red';
    }
    return <Tag color={color}>{status.toUpperCase()}</Tag>;
  };
  const handleCancelOrder = async (orderId) => {
    try {
     
      const response = await fetch(`http://localhost:3500/api/_e/order`, {
        method: 'PUT', // Assuming you are using a PUT request to mark the order as delivered
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          "order":{
             _id: orderId,
             status:"cancelled"
          }
        }),
        credentials: 'include',
      });
      const resData=await response.json();
      console.log(resData);
      if (resData.success) {
        console.log('Order delivered successfully');
        message.success("Order delivered successfully")
      } else {
        message.error("status is not ok")
        console.error('Failed to deliver order:', response.statusText);
      }
    } catch (error) {
      message.error("Error delivering order, 500")
      console.error('Error delivering order:', error);
    }
    handleModalClose();
  };
  
  const handleDeliverOrder = async (orderId) => {
    try {
     
      const response = await fetch(`http://localhost:3500/api/_e/order`, {
        method: 'PUT', // Assuming you are using a PUT request to mark the order as delivered
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          "order":{
             _id: orderId,
             status:"delivered"
          }
        }),
        credentials: 'include',
      });
      const resData=await response.json();
      console.log(resData);
      if (resData.success) {
        console.log('Order delivered successfully');
        message.success("Order delivered successfully")
      } else {
        message.error("status is not ok")
        console.error('Failed to deliver order:', response.statusText);
      }
    } catch (error) {
      message.error("Error delivering order, 500")
      console.error('Error delivering order:', error);
    }
    handleModalClose();
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
    <Button key="cancel" onClick={()=>handleCancelOrder(orderData._id)}>
      Cancel
    </Button>,
    <Button key="delivered" type="primary" onClick={()=>handleDeliverOrder(orderData._id)}>
      Delivered
    </Button>,
  ]}
  centered
  maskClosable={false}
  closable={false}
>
  {orderData && ( // Check if orderData is not null
    <>
      <p>
        <strong>Order ID:</strong> {orderData._id}
      </p>
      <p>
        <strong>Username:</strong> {orderData.userName}
      </p>
      <p>
        <strong>Cost:</strong> ₹{orderData.cost}
      </p>
      <p>
        <strong>Status:</strong> <Tag color={orderData.status === 'delivered' ? 'green' : 'red'}>{orderData.status}</Tag>
      </p>
      <p>
        <strong>Items:</strong>
      </p>
      <ul>
        {orderData.items.map((item, index) => (
          <li key={index}>
            {item.name} -  {item.quantity}
          </li>
        ))}
      </ul>
    </>
  )}
</Modal>


    </>
  );
};

export default Scanner;
