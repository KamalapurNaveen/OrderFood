import React from 'react';
import CardItem from './CardItem';
import { useState,useEffect } from 'react';
const AvailableItems = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
        try {
            const response = await fetch("http://localhost:3500/api/_e/item", {credentials: "include"});
            const resData = await response.json();
            setItems(resData.data.items);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    fetchItems();
  }, []);
  
  const availableItems = items.filter((item) => item.is_available);
 console.log(availableItems,"ahsass");  
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: 0, margin: 0 }}>
        {availableItems.map((item, index) => (
            <CardItem key={index} item={item}  />
        ))}
    </div>
  );
};

export default AvailableItems;
