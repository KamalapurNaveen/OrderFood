import React from "react";
import { List, Tag, Typography, Card,Space,Button} from 'antd';
import { useState } from "react";
import QRCode from 'qrcode.react';
import CustomModel from './components/CustomModel';
import { QrcodeOutlined, DeleteOutlined } from '@ant-design/icons';
import API_LINK from '../../util/api.link'

export default function Wallet(){
    const [transactions, setTransactions] = React.useState([]);
    const [balance, setBalance] = React.useState(0);
    const [qrModalVisible, setQrModalVisible] = useState(false);
    const [qrCodeValue, setQrCodeValue] = useState('');
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [userId,setUserId] =useState(null);
    React.useEffect(()=>{
        fetch(`${API_LINK}/api/_c/wallet/transactions`,{ 
            credentials: 'include',
            
        })
        .then(res => res.json())
        .then(data => {
            setTransactions(data.wallet.transactions.reverse())
            setBalance(data.wallet.balance)
        })
        .catch(err => console.log(err))

        // api call to get UserId

        fetch(`${API_LINK}/api/_c/profile`, {credentials : "include"})
        .then(resp => resp.json())
        .then(data => setUserId(data.info.id))
        .catch(error => console.log(error))

        console.log(userId);

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

    const handleShowQRCode = (userId) => {
        
        setQrCodeValue(`${userId}|wallet`);
        setSelectedOrderId(userId);
        setQrModalVisible(true);
      };
    return (
        <div style={{ margin: '2vw' }}>
            <Typography style={{ textAlign: 'center', color: 'grey', fontWeight: 200 }}>WALLET TRANSACTIONS</Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <Card.Grid style={{ textAlign: 'left', color: 'black', margin: 20, fontWeight: 500 }}>Balance : ₹{balance}</Card.Grid>
                <Button icon={<QrcodeOutlined />} size="medium" style={{ margin: '2px' }} onClick={() => handleShowQRCode(userId)}>Show QR</Button>
            </div>
            
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
             <CustomModel isVisible={qrModalVisible} closeModel={() => setQrModalVisible(false)}>
                <Space direction="vertical" style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <QRCode value={qrCodeValue} size={200} />
                <div style={{ position: 'absolute', bottom: '5px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', width: '100%' }}>{selectedOrderId}</div>
                </Space>
           </CustomModel>
        </div>
    );
}
