import React from 'react';
import { Button, Card } from 'antd';
import { EditOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

const CardItem = () => (
  <Card 
   style={{width:"100%"}}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
      <Button key="available">Available</Button>,
      <Button key="unavailable">Unavailable</Button>,
      
    ]}
  >
    <Meta
      title="Card title"
      description="This is the description"
    />
  </Card>
);

export default CardItem;
