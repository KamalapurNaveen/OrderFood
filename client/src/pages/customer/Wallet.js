import React from "react";
import { List, Tag, Typography } from 'antd';

export default function Wallet(){
    const [transactions, setTransactions] = React.useState([
        {
            type : 'debit',
            amount : '150',
            description : 'Payment for order 65c3507463d9f819d12a19a0',
            _id : '65c3507463d9f819d12a19a2',
            orderId : '65c3507463d9f819d12a19a0'
        },
        {
            type : 'debit',
            amount : '180',
            description : 'Payment for order 65c3507463d9f819d12a19a0',
            _id : '65c3507463d9f819d12a19a2',
            orderId : '65c3507463d9f819d12a19a0'
        },
        {
            type : 'debit',
            amount : '69',
            description : 'Payment for order 65c3507463d9f819d12a19a0',
            _id : '65c3507463d9f819d12a19a2',
            orderId : '65c3507463d9f819d12a19a0'
        }
    ]);

    React.useEffect(()=>{
        fetch('http://localhost:3500/api/_c/wallet/transactions',{ 
            credentials: 'include',
            
        })
        .then(res => res.json())
        .then(data => setTransactions(data.transactions.reverse()))
        .catch(err => console.log(err))
    }, [])

    const renderStatusTag = (status) => {
        let color = 'blue';
        if (status === 'credit') {
            color = 'green';
        } else if (status === 'debit') {
            color = 'red';
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
    };

    return (
        <div style={{margin : '2vw'}}>
            <Typography style={{ textAlign: 'center', color: 'grey', margin: 20, fontWeight: 200 }}>WALLET TRANSACTIONS</Typography>
            <List
                style={{ padding: 5, paddingLeft: 20, backgroundColor: "white", borderRadius: 5 }}
                dataSource={transactions}
                renderItem={transaction => (
                    <List.Item style={{ borderRadius: 10 }}>
                        <List.Item.Meta
                            title={<span style={{ fontWeight: 400, fontSize: 12 }}>{transaction._id}</span>}
                            description={
                                <>
                                    <span style={{ fontSize: 12 }}>{transaction.message}</span><br/>
                                    <span style={{ fontSize: 12 }}>{new Date(transaction.time).toLocaleString("en-US", { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</span>
                                    <div style={{ fontWeight: 'bold', fontSize: 13, color: "black" }}>₹{transaction.amount}</div>
                                </>
                            }
                            />
                            {renderStatusTag(transaction.type)}
                    </List.Item>
                )}
            />
        </div>
    );
}
