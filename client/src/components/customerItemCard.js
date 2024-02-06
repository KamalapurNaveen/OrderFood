import React, { useState } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Button, Avatar } from 'antd';

const { Meta } = Card;

const CustomerItemCard = ({ item, updateCartItems, prevQuantity }) => {
  const [expanded, setExpanded] = useState(false);
  const [quantity, setQuantity] = useState(prevQuantity);

  const maxDescLength = 40;
  const trimmedDesc = item.description.length > maxDescLength ? item.description.slice(0, maxDescLength) + "..." : item.description;

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const incQuantity = () => {
    const newQuantity = Math.min(quantity + 1, item.max_limit);
    updateCartItems({ item, quantity: newQuantity });
    setQuantity(newQuantity);
  };

  const decQuantity = () => {
    const newQuantity = Math.max(quantity - 1, 0);
    updateCartItems({ item, quantity: newQuantity });
    setQuantity(newQuantity);
  };

  return (
    <Card
      hoverable
      style={{ width: 400, margin: 5 }}
      actions={[
        <MinusOutlined key="decrease" onClick={decQuantity} />,
        <strong style={{ color: "black" }}>{quantity}</strong>,
        <PlusOutlined key="increase" onClick={incQuantity} />,
      ]}
    >
      <Meta
        title={
          <div>
            <div style={{ overflow: "scroll" }}>{item.name}</div>
            <div style={{ fontSize: 15, color: "grey" }}>Price: ₹{item.cost}</div>
          </div>
        }
        avatar={<Avatar src={item.image} shape='square' size={125} />}
        description={
          <div>
            {expanded ? item.description : trimmedDesc}
            {item.description.length > maxDescLength && (
              <Button type="link" onClick={toggleExpand} style={{ float: "right" }}>
                {expanded ? "Show less" : "Show more"}
              </Button>
            )}
          </div>
        }
      />
    </Card>
  );
};

export default CustomerItemCard;
