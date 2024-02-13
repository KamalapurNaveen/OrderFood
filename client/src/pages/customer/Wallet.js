import React from "react";
import { List, Tag, Typography, Card } from 'antd';

export default function Wallet(){
    const [transactions, setTransactions] = React.useState([]);
    const [balance, setBalance] = React.useState(0);

    React.useEffect(()=>{
        fetch('http://localhost:3500/api/_c/wallet/transactions',{ 
            credentials: 'include',
            
        })
        .then(res => res.json())
        .then(data => {
            setTransactions(data.wallet.transactions.reverse())
            setBalance(data.wallet.balance)
        })
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
            <Card.Grid style={{ textAlign: 'left', color: 'black', margin: 20, fontWeight: 500 }}>Balance : ₹{balance}</Card.Grid>
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
