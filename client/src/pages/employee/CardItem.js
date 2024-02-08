import React from 'react';
import { Button, Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;

const CardItem = ({ title, price, description, available,image,max_limit, onDelete, showButtons }) => (
  <Card
    style={{}}
    cover={
      <img
        alt="example"
        src={image}
      />
    }
    actions={
      showButtons ? [
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {available ? (
            <Button key="unavailable" type="text">Make Unavailable</Button>
          ) : (
            <Button key="available" type="text">Make Available</Button>
          )}
          <div style={{ width: 1, height: 24, backgroundColor: '#ccc', margin: '0 8px' }} /> {/* Dividing line */}
          <Button key="delete" type="text" onClick={onDelete} icon={<DeleteOutlined />} />
        </div>,
      ] : null
    }
  >
    <Meta
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{title}</span>
          <span>{price}</span>
        </div>
      }
      description={description}
    />
  </Card>
);

export default CardItem;
