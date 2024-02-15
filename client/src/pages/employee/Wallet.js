import React, { useState, useRef, useEffect } from 'react';
import QrReader from 'react-qr-scanner';
import { Row, Col, Modal, Button, Input, message } from 'antd';
import API_LINK from '../../util/api.link'

const Wallet = () => {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [scannerVisible, setScannerVisible] = useState(true);
  const [amountToAdd, setAmountToAdd] = useState('');
  const [result, setResult] = useState('');
  const scannerRef = useRef(null);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setPermissionGranted(true);
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
      fetchUserData(data.text);
    }
  };

  const handleError = (error) => {
    console.error(error);
    setResult('');
  };

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`${API_LINK}/api/_e/user?id=${userId}`, { credentials: 'include' });
      const resData = await response.json();
      setUserData(resData.data["user"]);
      setShowModal(true);
      if (scannerRef.current) {
        scannerRef.current.pauseScan();
      }
      setScannerVisible(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (scannerRef.current) {
      scannerRef.current.resumeScan();
    }
    setScannerVisible(true);
  };

  const handleAddMoney = async (userId) => {
    try {
      const response = await fetch(`${API_LINK}/api/_e/wallet`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          amount: amountToAdd
        }),
        credentials: 'include',
      });
      const resData = await response.json();
      if (resData.success) {
        message.success("Amount added successfully");
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

  return (
    <>
      <Row justify="center" align="middle" className="mt-4" style={{ height: 'calc(100vh - 64px)' }}>
        <Col xs={24} md={12} lg={8}>
          {permissionGranted && scannerVisible && (
            <QrReader
              ref={scannerRef}
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: '100%', maxHeight: '70vh' }}
            />
          )}
        </Col>
      </Row>

      <Modal
        title="User Details"
        visible={showModal}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
          <Button key="addMoney" type="primary" onClick={() => handleAddMoney(userData?._id)}>
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
              <strong>User ID:</strong> {userData._id}
            </p>
            <p>
              <strong>Username:</strong> {userData.userName}
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

export default Wallet;
