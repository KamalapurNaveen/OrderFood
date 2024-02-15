import React, { useEffect } from 'react';
import CardItem from './CardItem';
import { useState } from 'react';
import { message } from 'antd';
import API_LINK from '../../util/api.link'

const AllItems = () => {
  const [items, setItems] = useState([]);
  const [itemModified,setItemModified]=useState(false)
  useEffect(() => {
    const fetchItems = async () => {
        try {
            const response = await fetch(`${API_LINK}/api/_e/item`,{credentials: "include"});
            const resData = await response.json();
            setItems(resData.data.items);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    fetchItems();
  }, [itemModified]);
  const handleAvailabilityChange = async (item,available) => {
    setItemModified(!itemModified)
    try {
      const itemId=item._id;
      const response = await fetch(`${API_LINK}/api/_e/item`, {
        method: 'PUT', // Assuming you are using a PUT request to mark the order as delivered
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          "item":{
             _id: itemId,
             is_available:!(item.is_available)
          }
        }),
        credentials: 'include',
      });
      const resData=await response.json();
      console.log(resData);
      if (resData.success) {
        const item_name=item.name;
        const is_available=item.is_available;
        message.success((is_available ? `${item_name} made unavailable`  : `${item_name} made available`  ));
      } 
      else {
        message.error("status is not ok")
        console.error('Failed to change status of item', response.statusText);
      }
      } catch (error) {
      message.error(`Error while updating ${item.name}`)
    }
  };

  const handleItemDelete=async(item,available)=>{
    setItemModified(!itemModified)
    try {
      const itemId=item._id;
      const response = await fetch(`${API_LINK}/api/_e/item/delete?id=${itemId}`, { credentials: 'include',});
      const resData=await response.json();
      console.log(resData);
      if (resData.success) {
        const item_name=item.name;
        const is_available=item.is_available;
        message.success(`${item_name} is deleted`);
      } 
      else {
        message.error("status is not ok")
        console.error('failed to delete item', response.statusText);
      }
      } catch (error) {
      message.error(`Error while deleting ${item.name}`)
    }
  }
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: 0, margin: 0 }}>
        {items.map((item, index) => (
            <CardItem key={index} item={item} showButtons={true} onAvailabilityChange={() => handleAvailabilityChange(item)}
            onDelete={() => handleItemDelete(item)}  />
        ))}
    </div>
  );
};

export default AllItems;
