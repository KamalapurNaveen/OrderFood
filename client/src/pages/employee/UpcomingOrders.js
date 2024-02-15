import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Avatar, Typography, Statistic, Divider, List } from 'antd';
import './card.css'; // Assuming you have defined the 'cardh' class in this CSS file
import DropdownItems from './DropdownItems';

const { Text, Title } = Typography;

const UpcomingOrders = () => {
  const [upcomingOrders, setUpcomingOrders] = useState([]);
  const [itemImages, setItemImages] = useState({});

  useEffect(()=>{
    fetch('http://localhost:3500/api/_e/order/queue/stats', {credentials : 'include'})
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
  },[])

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:3500/api/_e/order/queue", { credentials: "include" });
        const resData = await response.json();
        setUpcomingOrders(resData.data.orders);

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
      const response = await fetch(`http://localhost:3500/api/_e/item/id?id=${itemId}`, { credentials: "include" });
      const resData = await response.json();
      return resData.data.image;
    } catch (error) {
      console.error("Error fetching image for item:", error);
      return null;
    }
  };
  // Calculate individual item counts
  const itemCounts = upcomingOrders.reduce((acc, order) => {
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
      <Title level={3} style={{ marginBottom: '20px', color: '#4E4E4E' }}>Item Counts</Title>
      <Row gutter={[16, 16]}>
      {Object.entries(itemCounts).map(([itemId, item]) => (
          <Col key={itemId} xs={24} sm={12} md={8} lg={6} xl={4}> {/* Adjust column size based on your layout */}
            <div style={{ position: 'relative', paddingBottom: '100%', marginBottom: '10px' }}> {/* Maintain aspect ratio for the card */}
              <Card
                className='cardh'
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  border: 'px solid #e8e8e8',
                  borderRadius: '8px', // Adjust border radius as needed
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)', // Add shadow for better visual
                  display: 'flex', // Use flexbox for layout
                  flexDirection: 'column' // Arrange content vertically
                }}
              >
                <div style={{ flex: 1 }}> {/* Allow the image to grow */}
                  <img
                    src={itemImages[itemId]}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', borderRadius: '8px 8px 0 0' }} // Adjust border radius as needed
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
      <Title level={3} style={{ marginTop: '20px', color: '#4E4E4E' }}>Upcoming Orders</Title>
      <Row gutter={[16, 16]}>
        <List
          style={{ margin: 2, padding: 5, paddingLeft: 10, backgroundColor: "white", borderRadius: 5, width: "90%" }}
          dataSource={upcomingOrders}
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
    </div>
  );
};

export default UpcomingOrders;
