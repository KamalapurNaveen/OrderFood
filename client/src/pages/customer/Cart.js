import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import Typography from 'antd/es/typography/Typography';
import CartList from "./components/CartList"
import BillCard from "./components/BillCard"
import CustomModel from './components/CustomModel';
import OrderStatus from  './components/OrderStatus'

function parseOrderData(jsonData) {
    const orderItems = Object.keys(jsonData).map(itemId => {
        const itemData = jsonData[itemId];
        return {
            item: itemData.item._id,
            name: itemData.item.name,
            cost: itemData.item.cost,
            quantity: itemData.quantity,
        };
    });
    const totalCost = orderItems.reduce((total, item) => total + (item.cost * item.quantity), 0);
    return {
        items: orderItems,
        cost: totalCost
    };
}

export default function Cart() {
    const [showStatusModel, setShowStatusModel] = useState(false);
    const [walletStatus, setWalletStatus] = useState({ balanceAvailable: false, message: "Something went wrong. Please try again later." });
    const [disable, setDisable] = useState(true);
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = window.localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : {};
    });

    useEffect(() => {
        window.localStorage.setItem("cart", JSON.stringify(cartItems));
        setDisable(Object.keys(cartItems).length === 0);
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

    const handlePlaceOrder = async () => {
        var requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(parseOrderData(cartItems)),
            credentials: "include"
        };

        await fetch("http://localhost:3500/api/_c/order/add", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.data.walletStatus.balanceAvailable == false) {
                    setWalletStatus(result.data.walletStatus)
                    setShowStatusModel(true)
                } else {
                    setCartItems({})
                    setWalletStatus(result.data.walletStatus)
                    setShowStatusModel(true)
                }
            })
            .catch(error => {
                setShowStatusModel(true)
            });
    };

    return (
        <div style={{ margin: "2vw" }}>
            <Typography style={{ textAlign: 'center', color: 'grey', margin: 20, fontWeight: 200 }}>ITEM(S) ADDED</Typography>
            <CartList updateCartItems={updateCartItems} cartValues={cartValues} />
            <Typography style={{ textAlign: 'center', color: 'grey', margin: 20, fontWeight: 200 }}>BILL SUMMARY</Typography>
            <BillCard totalCost={totalCost} />
            <div style={styles.placeOrderButtonContainer}>
                <Button type="primary" style={styles.placeOrderButton} onClick={handlePlaceOrder} disabled={disable}>
                    Place Order <ArrowRightOutlined style={{ verticalAlign: 'middle' }} />
                </Button>
            </div>
            <CustomModel isVisible={showStatusModel} closeModel={() => setShowStatusModel(false)}>
                <OrderStatus walletStatus={walletStatus} />
            </CustomModel>
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
