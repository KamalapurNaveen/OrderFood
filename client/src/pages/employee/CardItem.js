import React, { useState } from 'react';
import { Card, Avatar, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './CardItem.css'; // Import custom scrollbar styles

const { Meta } = Card;

const CardItem = ({ item, showButtons, onAvailabilityChange, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const maxDescLength = 40;
  const trimmedDesc =
    item.description.length > maxDescLength
      ? item.description.slice(0, maxDescLength) + '...'
      : item.description;

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div style={{ width: 400, overflow: 'hidden' }}> {/* Enforce a fixed width */}
      <Card hoverable style={{ width: '100%', margin:"0", marginBottom:"5px" , marginRight:"5px"}} actions={showButtons ? [
        <Button
          type="primary"
          style={{ backgroundColor: item.is_available ? 'red' : 'green' }}
          onClick={() => onAvailabilityChange(item)}
        >
          {item.is_available ? 'Make Unavailable' : 'Make Available'}
        </Button>,
        <Button
          type="danger"
          icon={<DeleteOutlined />}
          onClick={() => onDelete(item)}
        >
          Delete
        </Button>
      ] : []}>
        <Meta
          title={
            <div>
              <div style={{ overflow: 'scroll' }}>{item.name}</div>
              <div style={{ fontSize: 15, color: 'grey' }}>Price: ₹{item.cost}</div>
            </div>
          }
          avatar={<Avatar src={item.image} shape="square" size={125} />}
          description={
            <div>
              {expanded ? item.description : trimmedDesc}
              {item.description.length > maxDescLength && (
                <Button type="link" onClick={toggleExpand} style={{ float: 'right' }}>
                  {expanded ? 'Show less' : 'Show more'}
                </Button>
              )}
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default CardItem;
