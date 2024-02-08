import React, { useEffect } from 'react';
import CardItem from './CardItem';
import { useState } from 'react';
const AllItems = () => {
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
  
  return (
    <div className="container-fluid align-items-center" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      {items.map((item) => (
        <CardItem 
          key={item.id}
          title={item.title}
          price={item.cost}
          description={item.description}
          available={item.is_available}
          image={item.image}
          max_limit={item.max_limit}
          showButtons={true}
        />
      ))}
    </div>
  );
};

export default AllItems;
