import React from 'react';
import { Card, Row, Col, Avatar, Typography, Statistic, Divider } from 'antd';

const { Meta } = Card;
const { Text, Title } = Typography;

const upcomingOrders = [
  {
    id: 1,
    name: 'Alice Smith',
    item: 'Salad',
    price: '$10',
    count: 3,
  },
  {
    id: 2,
    name: 'Bob Johnson',
    item: 'Pasta',
    price: '$15',
    count: 2,
  },
  {
    id: 1,
    name: 'Alice Smith',
    item: 'Salad',
    price: '$10',
    count: 3,
  },
  {
    id: 2,
    name: 'Bob Johnson',
    item: 'Pasaaqta',
    price: '$15',
    count: 2,
  },
  {
    id: 1,
    name: 'Alice Smith',
    item: 'Salaasd',
    price: '$10',
    count: 3,
  },
  {
    id: 2,
    name: 'Bob Johnson',
    item: 'Pastaas',
    price: '$15',
    count: 2,
  },
  // Add more upcoming orders as needed
];

const UpcomingOrders = () => {
  // Calculate count of each item
  const itemCounts = {};
  upcomingOrders.forEach(order => {
    if (itemCounts[order.item]) {
      itemCounts[order.item] += order.count;
    } else {
      itemCounts[order.item] = order.count;
    }
  });

  const itemColors = ['#E8EAF6', '#F0F2F5', '#E8F5E9', '#E0F7FA', '#FCE4EC', '#FFF3E0', '#F1F8E9', '#E0F2F1', '#E1F5FE', '#F3E5F5']; // Define item colors
  let colorIndex = 0;

  return (
    <div style={{ padding: '20px' }}>
      <Title level={3} style={{ marginBottom: '20px', color: '#4E4E4E' }}>Item Counts</Title>
      <Row gutter={[16, 16]}>
        {Object.entries(itemCounts).map(([item, count]) => {
          const itemColor = itemColors[colorIndex % itemColors.length];
          colorIndex++;
          return (
            <Col key={item} xs={12} sm={8} md={6} lg={4}>
              <Card style={{ backgroundColor: itemColor }}>
                <Statistic
                  title={<Text style={{ color: '#4E4E4E' }}>{item}</Text>}
                  value={count}
                  valueStyle={{ fontSize: '24px', color: '#4E4E4E' }}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
      <Divider />
      <Title level={3} style={{ marginTop: '20px', color: '#4E4E4E' }}>Upcoming Orders</Title>
      <Row gutter={[16, 16]}>
        {upcomingOrders.map((order, index) => (
          <Col key={order.id} xs={24} sm={12} md={8} lg={6}>
            <Card style={{ backgroundColor:  '#F0F2F5' }}>
              <Meta
                avatar={<Avatar style={{ backgroundColor: '#D1D1D1', color: '#4E4E4E' }}>{order.name[0]}</Avatar>}
                title={<Text strong style={{ color: '#4E4E4E' }}>{order.name}</Text>}
                description={
                  <div>
                    <p><Text strong>Item:</Text> {order.item}</p>
                    <p><Text strong>Price:</Text> {order.price}</p>
                    <p><Text strong>Count:</Text> {order.count}</p>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default UpcomingOrders;
