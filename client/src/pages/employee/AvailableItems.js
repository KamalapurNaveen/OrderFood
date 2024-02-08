import React from 'react';
import CardItem from './CardItem';
import { useState,useEffect } from 'react';
const AvailableItems = () => {
  const [items, setItems] = useState([{
    name:"Dosa with chutney ,wada ajdahvhdva adsa ",
    cost: "₹100",
    description:"descgdhad dhjgadad dda addd dsa d sadfhghs gsgfuash fan hjgdsagduygsadusad ad adgaydg sad su gfiusagsauhsaudgsaydgag g ggsaud giudsiudsudgsadggsgdush gdsahdgsuh suhus",
    is_available:true,
    image:"https://b.zmtcdn.com/data/dish_photos/fc0/857b57ae6a17e12e61174a3a45fe8fc0.png",
    max_limit:"1",
    showButtons:false
  },
  {
    name:"Dosa",
    cost: "₹100",
    description:"desc",
    is_available:true,
    image:"https://b.zmtcdn.com/data/dish_photos/fc0/857b57ae6a17e12e61174a3a45fe8fc0.png",
    max_limit:"1",
    showButtons:false
  },
  {
    name:"Dosa",
    cost: "₹100",
    description:"desc",
    is_available:true,
    image:"https://b.zmtcdn.com/data/dish_photos/fc0/857b57ae6a17e12e61174a3a45fe8fc0.png",
    max_limit:"1",
    showButtons:false
  }

]);
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

    //fetchItems();
  }, []);
  
  const availableItems = items.filter((item) => item.is_available);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: 0, margin: 0 }}>
        {availableItems.map((item, index) => (
            <CardItem key={index} item={item}  />
        ))}
    </div>
  );
};

export default AvailableItems;
