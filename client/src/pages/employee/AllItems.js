import React, { useEffect } from 'react';
import CardItem from './CardItem';
import { useState } from 'react';
const AllItems = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
        try {
            const response = await fetch("http://localhost:3500/api/_e/item",{credentials: "include"});
            const resData = await response.json();
            setItems(resData.data.items);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    fetchItems();
  }, []);
  
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: 0, margin: 0 }}>
        {items.map((item, index) => (
            <CardItem key={index} item={item}  />
        ))}
    </div>
  );
};

export default AllItems;
