import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

import CartList from "../../components/customerCartList"
import BillCard from "../../components/customerBillCard"
import Typography from 'antd/es/typography/Typography';

export default function Cart() {
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = window.localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : {};
    });

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
    };

    const cartValues = Object.values(cartItems);

    const totalCost = cartValues.reduce((total, cartItem) => {
        return total + (cartItem.item.cost * cartItem.quantity);
    }, 0);

    const handlePlaceOrder = () => {
        // Implement logic for placing the order
        console.log("Placing order...");
    };

    return (
        <div>
            <Typography style={{ textAlign: 'center', color: 'grey', margin: 20, fontWeight: 200 }}>ITEM(S) ADDED</Typography>
            <CartList updateCartItems={updateCartItems} cartValues={cartValues} />
            <Typography style={{ textAlign: 'center', color: 'grey', margin: 20, fontWeight: 200 }}>BILL SUMMARY</Typography>
            <BillCard totalCost={totalCost} />
            <div style={styles.placeOrderButtonContainer}>
                <Button type="primary" style={styles.placeOrderButton} onClick={handlePlaceOrder}>
                    Place Order <ArrowRightOutlined style={{ verticalAlign: 'middle' }} />
                </Button>
            </div>
        </div>
    );
}

const styles = {
    placeOrderButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },
    placeOrderButton: {
        padding: 10,
        width: 400,
        height: 50,
        fontSize: 20,
        fontWeight: 800,
    },
};
