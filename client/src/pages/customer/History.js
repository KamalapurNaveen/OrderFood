import React, { useState, useEffect } from 'react';
import { List, Tag, Typography, Button, Space, message } from 'antd';
import { QrcodeOutlined, DeleteOutlined } from '@ant-design/icons';
import CustomModel from './components/CustomModel';
import QRCode from 'qrcode.react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:3500/api/_c/order/history", { credentials: "include" });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      if (result.success) {
        setOrders(result.history.reverse());
      } else {
        console.log(result);
      }
    } catch (error) {
      console.log('Error:', error);
    }
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

  const handleCancelOrder = (orderId) => {
    fetch(`http://localhost:3500/api/_c/order/cancel?orderId=${orderId}`, { credentials: "include" })
    .then(res => res.json())
    .then(data => {
      fetchOrders();
      messageApi.open({
        type: data.success ? 'success' : 'error',
        content: data.message,
      });
    })
    .catch(err => {
      messageApi.open({
        type: 'error',
        content: 'Something went wrong. Please try again later.',
      });
    })

  };

  const handleShowQRCode = (orderId) => {
    setQrCodeValue(`${orderId}|order`);
    setSelectedOrderId(orderId);
    setQrModalVisible(true);
  };

  const canCancelOrder = (orderTime) => {
    const orderDateTime = new Date(orderTime).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = (currentTime - orderDateTime) / (1000 * 60);
    return timeDifference <= 20;
  };

  return (
    <div style={{margin : '2vw'}}>
      {contextHolder}
      <Typography style={{ textAlign: 'center', color: 'grey', margin: 20, fontWeight: 200 }}>ORDER HISTORY</Typography>
      <List
        style={{ padding: 5, paddingLeft: 20, backgroundColor: "white", borderRadius: 5 }}
        dataSource={orders}
        renderItem={order => (
          <List.Item
            style={{ borderRadius: 10 }}
            actions={
              order.status !== 'pending' ? [
                renderStatusTag(order.status)
              ] : [
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Button icon={<QrcodeOutlined />} size="small" style={{ margin: '2px', width: '100%' }} onClick={() => handleShowQRCode(order._id)}>Show QR</Button><br />
                  {canCancelOrder(order.time) && <Button icon={<DeleteOutlined />} size="small" style={{ margin: '2px', width: '100%' }} onClick={() => handleCancelOrder(order._id)}>Cancel</Button>}
                </div>
              ]}
          >
            <List.Item.Meta
              title={<span style={{ fontWeight: 400, fontSize: 12 }}>{new Date(order.time).toLocaleString("en-US", { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</span>}
              description={
                <>
                  <span style={{ fontSize: 12 }}>
                    {order.items.map(item => `${item.name} (${item.quantity})`).join(', ')}
                  </span>
                  <div style={{ fontWeight: 'bold', fontSize: 13, color: "black" }}>₹{order.cost}</div>
                </>
              }
            />
          </List.Item>
        )}
      />
      <CustomModel isVisible={qrModalVisible} closeModel={() => setQrModalVisible(false)}>
        <Space direction="vertical" style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <QRCode value={qrCodeValue} size={200} />
          <div style={{ position: 'absolute', bottom: '5px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', width: '100%' }}>{selectedOrderId}</div>
        </Space>
      </CustomModel>
    </div>
  );
};

export default OrderHistory;
