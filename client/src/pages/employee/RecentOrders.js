import React from 'react';
import { Card, Row, Col, Avatar, Typography, Statistic, Divider ,List} from 'antd';
import './card.css'
import DropdownItems from './DropdownItems';
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
    item: 'Pizsaaa',
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
const getInitials = (name) => {
  const nameArray = name.trim().split(' ');
  return nameArray.reduce((acc, curr) => acc + curr.charAt(0).toUpperCase(), '');
};
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
              <Card  className='card'>
                <Statistic
                  title={<Text style={{ color: 'black', position:"relative",fontWeight:"10", fontSize:"17px"}}><strong>{item} </strong> <strong>{count}</strong></Text>}
                  value={count}
                  valueStyle={{ fontSize: '20px', color: 'black'  ,fontWeight:"600"}}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
      <Divider />
      <Divider />
      <Title level={3} style={{ marginBottom: '20px', color: '#4E4E4E' }}>Recent Orders</Title>
      <Row gutter={[16, 16]}>
      <List 
            style={{ margin: 2, padding: 5, paddingLeft: 10, backgroundColor: "white", borderRadius: 5 , width:"90%" }}
            dataSource={recentOrders}
            renderItem={(item) => (
                <List.Item
                    style={{ borderRadius: 10 }}
                >
                    <List.Item.Meta
                        avatar={<Avatar size={50}>{getInitials('Naveen')}</Avatar>}
                        title={<span style={{ fontWeight: 'bold'  , alignSelf:'center'}}>Naveen </span>}
                        description={<span style={{ fontWeight: 'bold' }}>OrderId: 3</span>}
                    />
                    <DropdownItems/>
                </List.Item>
            )}
        />
      </Row>
      <Divider />
    </div>
  );
};

export default RecentOrders;
