import React, { useState, useEffect } from 'react';
import Item  from "./components/ItemCard";
import API_LINK from '../../util/api.link'
import { useNav } from './NavContext';

const Menu = () => {
    const [items, setItems] = useState([]);
    const {cartItems, setCartItems} = useNav();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`${API_LINK}/api/_c/item`,{ 
                    credentials: 'include',
                    
                });
                const resData = await response.json();
                setItems(resData.data.items);
            } catch (error) {
                console.error("Error fetching items");
            }
        };

        fetchItems();
    }, []);

    useEffect(() => {
        window.localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);
    
    const updateCartItems = ({ item, quantity }) => {
        const updatedCartItems = { ...cartItems };
        if (quantity === 0) {
            delete updatedCartItems[item._id];
        } else {
            updatedCartItems[item._id] = { item, quantity };
        }
        setCartItems(updatedCartItems);
    }

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: 0, margin: 0 }}>
            {items.map((item, index) => (
                <Item key={index} item={item} updateCartItems={updateCartItems} prevQuantity={(cartItems[item._id] && cartItems[item._id].quantity) || 0} />
            ))}
        </div>
    );
};

export default Menu;
