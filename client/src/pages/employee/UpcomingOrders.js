import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Avatar, Typography, Statistic, Divider, List } from 'antd';
import './card.css'; // Assuming you have defined the 'cardh' class in this CSS file
import DropdownItems from './DropdownItems';

const { Text, Title } = Typography;

const UpcomingOrders = () => {
  const [upcomingOrders, setUpcomingOrders] = useState([]);
  const [itemImages, setItemImages] = useState({});

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
          <Col key={itemId} xs={12} sm={8} md={6} lg={4}>
            <Card
              className='cardh'
              style={{
                backgroundImage: `url(${itemImages[itemId]})`, // Use the fetched image URLs directly
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}
            >
              <Statistic
                title={<Text style={{ color: 'black', position: "relative", fontWeight: "10", fontSize: "17px" }}>{item.name}: {item.count} :</Text>}
                value={item.count}
                valueStyle={{ fontSize: '20px', color: 'black', fontWeight: "600" }}
              />
            </Card>
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
