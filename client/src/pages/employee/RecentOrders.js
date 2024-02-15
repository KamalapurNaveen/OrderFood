import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Statistic, Divider, List, Avatar } from 'antd';
import DropdownItems from './DropdownItems';
import API_LINK from '../../util/api.link'
import './card.css';

const { Text, Title } = Typography;

const RecentOrders = () => {
  const [recentOrders, setRecentOrders] = useState([]);
  const [itemImages, setItemImages] = useState({});
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_LINK}/api/_e/order/history`, { credentials: "include" });
        const resData = await response.json();
        setRecentOrders(resData.data.orders);

        // Fetch image URLs for each item
        const images = {};
        for (const order of resData.data.orders) {
          for (const item of order.items) {
            if (!images[item.item]) {
              const imageUrl = await getImageForItem(item.item);
              images[item.item] = imageUrl;
            }
          }
        }
        setItemImages(images);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const getImageForItem = async (itemId) => {
    try {
      const response = await fetch(`${API_LINK}/api/_e/item/id?id=${itemId}`, { credentials: "include" });
      const resData = await response.json();
      return resData.data.image;
    } catch (error) {
      console.error("Error fetching image for item:", error);
      return null;
    }
  };
  // Calculate total revenue
  const totalRevenue = recentOrders.reduce((acc, order) => {
    const orderTotal = order.items.reduce((total, orderItem) => {
      return total + (orderItem.cost * orderItem.quantity);
    }, 0);
    return acc + orderTotal;
  }, 0);

  // Calculate total item count
  const totalItemCount = recentOrders.reduce((acc, order) => {
    return acc + order.items.reduce((total, orderItem) => total + orderItem.quantity, 0);
  }, 0);

  // Calculate individual item counts
  const itemCounts = recentOrders.reduce((acc, order) => {
    order.items.forEach(orderItem => {
      const { item: itemId, name, cost, quantity } = orderItem;
      const totalCost = cost * quantity;
      if (acc[itemId]) {
        acc[itemId].count += quantity;
        acc[itemId].totalCost += totalCost;
      } else {
        acc[itemId] = { name, count: quantity, totalCost };
      }
    });
    return acc;
  }, {});

  return (
    <div style={{ padding: '20px' }}>
      <Card style={{ marginBottom: '20px' }}>
        <Text strong style={{ fontSize: '24px', color: '#4E4E4E' }}>Total Revenue: ₹{totalRevenue}</Text>
        <br />
        <Text strong style={{ fontSize: '18px', color: '#4E4E4E' }}>Total Count: {totalItemCount}</Text>
      </Card>
      <Divider />
      <Title level={3} style={{ marginBottom: '20px', color: '#4E4E4E' }}>Item Counts</Title>
      <Row gutter={[16, 16]}>
        {Object.entries(itemCounts).map(([itemId, item]) => (
          <Col key={itemId} xs={24} sm={12} md={8} lg={6} xl={4} style={{padding:"0px",margin:"0"}}> {/* Adjust column size based on your layout */}
            <div style={{ position: 'relative', paddingBottom: '100%', marginBottom: '10px' }}> {/* Maintain aspect ratio for the card */}
              <Card
                className='cardh'
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  
                  borderRadius: '8px', // Adjust border radius as needed
                  // Add shadow for better visual
                  display: 'flex', // Use flexbox for layout
                  flexDirection: 'column' // Arrange content vertically
                }}
              >
                <div > 
                  <img
                    src={itemImages[itemId]}
                    alt={item.name}
                    style={{ width: '100%', height: '100%' }} // Adjust border radius as needed
                  />
                </div>
                <div style={{display:"flex"}}>
                  <div>
                  <p>{item.name}</p>
                  </div>
                  <div>
                  <p style={{fontWeight:"700", paddingLeft:"20px"}}>{item.count}</p>
                  </div>
                </div>
                
              </Card>
            </div>
          </Col>
        ))}
      </Row>
      <Divider />
      <Divider />
      <Title level={3} style={{ marginBottom: '20px', color: '#4E4E4E' }}>Recent Orders</Title>
      <Row gutter={[16, 16]}>
        <List
          style={{ margin: 2, padding: 5, paddingLeft: 10, backgroundColor: "white", borderRadius: 5, width: "90%" }}
          dataSource={recentOrders}
          renderItem={(order) => (
            <List.Item style={{ borderRadius: 10 }}>
              <List.Item.Meta
                avatar={<Avatar size={50}>{order.userName ? order.userName.charAt(0).toUpperCase() : ''}</Avatar>}
                title={<span style={{ fontWeight: 'bold', alignSelf: 'center' }}>{order.userName}</span>}
                description={<span style={{ fontWeight: 'bold' }}>OrderId: {order._id}</span>}
              />
              <DropdownItems items={order.items} />
            </List.Item>
          )}
        />
      </Row>
      <Divider />
    </div>
  );
};

export default RecentOrders;
