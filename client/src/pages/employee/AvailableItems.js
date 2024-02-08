import React from 'react';
import CardItem from './CardItem';
import { useState,useEffect } from 'react';
const AvailableItems = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
        try {
            const response = await fetch("http://localhost:3500/api/_e/item");
            const resData = await response.json();
            setItems(resData.data.items);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    fetchItems();
  }, []);
  
  const availableItems = items.filter((item) => item.is_available);

  return (
    <div className="container-fluid align-items-center" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      {availableItems.map((item) => (
        <CardItem
          key={item.id}
          title={item.title}
          price={item.cost}
          description={item.description}
          available={item.is_available}
          image={item.image}
          max_limit={item.max_limit}
          showButtons={false}
        />
      ))}
    </div>
  );
};

export default AvailableItems;
