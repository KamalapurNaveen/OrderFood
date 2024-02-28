import React, { useState, useEffect } from 'react';
import Item  from "./components/ItemCard";
import SearchItem from "./components/ItemSearch";
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
    const searchItems = async (text) => {
        try {
            const response = await fetch(`${API_LINK}/api/_c/item/search?text=${text}`,{ 
                credentials: 'include',
                
            });
            const resData = await response.json();
            console.log(resData)
            setItems(resData.data.items);
        } catch (error) {
            console.error("Error fetching items");
        }
    };

    var timeoutRef;
    const handleOnChange = (e) => {
        clearTimeout(timeoutRef);
        timeoutRef = setTimeout(() => {
            searchItems(e.target.value);
        }, 500); 
    };
    
    return (
        <>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: 0, margin: "2vh 6vw" }}>
                <SearchItem handleOnChange={handleOnChange}/>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: 0, margin: 0 }}>
                {items.map((item, index) => (
                    <Item key={index} item={item} updateCartItems={updateCartItems} prevQuantity={(cartItems[item._id] && cartItems[item._id].quantity) || 0} />
                ))}
            </div>
        </>
    );
};

export default Menu;
