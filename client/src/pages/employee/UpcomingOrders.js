import React from 'react';
import { Card, Row, Col, Avatar, Typography, Statistic, Divider,List,Button } from 'antd';
import './card.css'

import DropdownItems from './DropdownItems';

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
const getInitials = (name) => {
  const nameArray = name.trim().split(' ');
  return nameArray.reduce((acc, curr) => acc + curr.charAt(0).toUpperCase(), '');
};
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
          return (
            <Col key={item} xs={12} sm={8} md={6} lg={4}>
              <Card  className='card'>
                <Statistic
                  title={<Text style={{ color: 'black', position:"relative",fontWeight:"10", fontSize:"17px"}}><strong>{item}</strong></Text>}
                  value={count}
                  valueStyle={{ fontSize: '20px', color: 'black'  ,fontWeight:"600"}}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
      <Divider />
      <Title level={3} style={{ marginTop: '20px', color: '#4E4E4E' }}>Upcoming Orders</Title>
      <Row gutter={[16, 16]}>
      <List 
            style={{ margin: 2, padding: 5, paddingLeft: 10, backgroundColor: "white", borderRadius: 5 , width:"90%" }}
            dataSource={upcomingOrders}
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
    </div>
  );
};

export default UpcomingOrders;
