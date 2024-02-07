import React from 'react';
import { Card, Row, Col, Avatar, Typography, Statistic, Divider } from 'antd';

const { Meta } = Card;
const { Text, Title } = Typography;

const recentOrders = [
  {
    id: 1,
    name: 'John Doe',
    item: 'Pizza',
    price: '$10',
    count: 2,
  },
  {
    id: 2,
    name: 'Alice Smith',
    item: 'Burger',
    price: '$8',
    count: 1,
  },
  {
    id: 1,
    name: 'John Doe',
    item: 'Pizza',
    price: '$10',
    count: 2,
  },
  {
    id: 2,
    name: 'Alice Smith',
    item: 'Burgaaever',
    price: '$8',
    count: 1,
  },
  {
    id: 1,
    name: 'John Doe',
    item: 'Pisazza',
    price: '$10',
    count: 2,
  },
  {
    id: 2,
    name: 'Alice Smith',
    item: 'Burgaaer',
    price: '$8',
    count: 1,
  },
  {
    id: 1,
    name: 'John Doe',
    item: 'Pizzaa',
    price: '$100',
    count: 2,
  },
  {
    id: 2,
    name: 'Alice Smith',
    item: 'Burgesr',
    price: '$8',
    count: 1,
  },
  // Add more recent orders as needed
];

const RecentOrders = () => {
  // Calculate total revenue
  const totalRevenue = recentOrders.reduce((acc, order) => acc + (parseInt(order.price.replace('$', '')) * order.count), 0);

  // Calculate total item count
  const totalItemCount = recentOrders.reduce((acc, order) => acc + order.count, 0);

  // Calculate individual item counts
  const itemCounts = recentOrders.reduce((acc, order) => {
    if (acc[order.item]) {
      acc[order.item] += order.count;
    } else {
      acc[order.item] = order.count;
    }
    return acc;
  }, {});

  const itemColors = ['#E8EAF6', '#F0F2F5', '#E8F5E9', '#E0F7FA', '#FCE4EC', '#FFF3E0', '#F1F8E9', '#E0F2F1', '#E1F5FE', '#F3E5F5']; // Define item colors
  let colorIndex = 0; // Track the index of the current color

  return (
    <div style={{ padding: '20px' }}>
      <Card style={{ marginBottom: '20px' }}>
        <Meta
          title={<Text strong style={{ fontSize: '24px', color: '#4E4E4E' }}>Total Revenue: ${totalRevenue}</Text>}
          description={<Text strong style={{ fontSize: '18px', color: '#4E4E4E' }}>Total Count: {totalItemCount}</Text>}
        />
      </Card>
      <Divider />
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
      <Title level={3} style={{ marginBottom: '20px', color: '#4E4E4E' }}>Recent Orders</Title>
      <Row gutter={[16, 16]}>
        {recentOrders.map((order, index) => (
          <Col key={order.id} xs={24} sm={12} md={8} lg={6}>
            <Card style={{ backgroundColor:  '#F0F2F5'  }}>
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
      <Divider />
    </div>
  );
};

export default RecentOrders;
