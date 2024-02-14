import React, { useState, useRef, useEffect } from 'react';
import QrReader from 'react-qr-scanner';
import { Row, Col, Modal, Button, Tag, message ,Input} from 'antd';

const Scanner = () => {
  const [result, setResult] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [walletData, setWalletData] = useState(null);
  const [amountToAdd, setAmountToAdd] = useState('');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
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

  const handleOrderScan = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3500/api/_e/order?id=${orderId}`, { credentials: "include" });
      const resData = await response.json();
      setOrderData(resData.data["order"]);
      setShowOrderModal(true);
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

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3500/api/_e/profile/customer?id=${userId}`, { credentials: 'include' });
      const resData = await response.json();
      console.log(resData);
      setUserData(resData.data);
      console.log(userData);
      setShowWalletModal(true);
      if (scannerRef.current) {
        scannerRef.current.pauseScan();
      }
      setScannerVisible(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleAddMoney = async (wallet_id,amountToAdd) => {
    try {
      const response = await fetch(`http://localhost:3500/api/_e/profile/customer/wallet?id=${wallet_id}&amount=${amountToAdd}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const resData = await response.json();
      if (resData.success) {
        message.success(`Amount ₹${amountToAdd} added successfully`);
      } else {
        message.error("Failed to add amount");
        console.error('Failed to add amount:', response.statusText);
      }
    } catch (error) {
      message.error("Error adding amount, 500");
      console.error('Error adding amount:', error);
    }
    handleModalClose();
  };

  const handleWalletScan = async (userId) => {
      fetchUserData(userId);
  };

  const handleScan = (data) => {
    if (data) {
      //setShowOrderModal(true);
      console.log(data.text);
      
      // Split the scanned data into an array using '|' as the delimiter
      const [id, type] = data.text.split('|');
      if (id && type) {
        if (type === 'order') {
        
          handleOrderScan(id);
        } else if (type === 'wallet') {
          // Handle wallet scan
    
          handleWalletScan(id);
        } else {
          // If type is neither order nor wallet, log an error or handle it accordingly
          console.error('Unknown data type:', type);
        }
      } else {
        console.error('Invalid scanned data format:', data.text);
      }
    }
  };
  
  const handleModalClose = () => {
    setShowOrderModal(false);
    setShowWalletModal(false);
    // Resume scanning when modal is closed
    if (scannerRef.current) {
      scannerRef.current.resumeScan();
    }
    // Show the scanner
    setScannerVisible(true);
  };
  
  const handleCancelOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3500/api/_e/order`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "order":{
             _id: orderId,
             status:"cancelled"
          }
        }),
        credentials: 'include',
      });
      const resData = await response.json();
      console.log(resData);
      if (resData.success) {
        console.log('Order cancelled successfully');
        message.success("Order cancelled successfully")
      } else {
        message.error("status is not ok")
        console.error('Failed to cancel order:', response.statusText);
      }
    } catch (error) {
      message.error("Error cancelling order, 500")
      console.error('Error cancelling order:', error);
    }
    handleModalClose();
  };
  
  const handleDeliverOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3500/api/_e/order`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "order":{
             _id: orderId,
             status:"delivered"
          }
        }),
        credentials: 'include',
      });
      const resData = await response.json();
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
      
              onScan={handleScan}
              style={{ width: '100%', maxHeight: '70vh' }} // Adjust size of the scanner
            />
          )}
        </Col>
      </Row>

      <Modal
        title="Order Details"
        visible={showOrderModal}
        onCancel={handleModalClose}
        footer={orderData && (orderData.status === 'delivered' || orderData.status === 'cancelled' )? [
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>
        ] : [
          <Button key="cancel" onClick={() => handleCancelOrder(orderData._id)}>
            Cancel
          </Button>,
          <Button key="delivered" type="primary" onClick={() => handleDeliverOrder(orderData._id)}>
            Delivered
          </Button>,
        ]}
        centered
        maskClosable={false}
        closable={false}
      >
        {orderData && (
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

      {/* Add modal for wallet data if needed */}
      <Modal
        title="User Details"
        visible={showWalletModal}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
          <Button key="addMoney" type="primary" onClick={() => handleAddMoney(userData?.wallet_id,amountToAdd)}>
            Add Money
          </Button>,
        ]}
        centered
        maskClosable={false}
        closable={false}
      >
        {userData && (
          <>
            <p>
              <strong>User ID:</strong> {userData.id}
            </p>
            <p>
              <strong>Username:</strong> {userData.name}
            </p>
            <Input
              placeholder="Amount to Add"
              onChange={(e) => setAmountToAdd(e.target.value)}
              value={amountToAdd}
            />
          </>
        )}
      </Modal>
    </>
  );
};

export default Scanner;
