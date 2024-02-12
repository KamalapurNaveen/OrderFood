import React from 'react';
import { Button, Result } from 'antd';
import { useNav } from '../NavContext';

export default function OrderStatus({walletStatus}){
  const { setActiveTab } = useNav()

  return (
      <Result
      status = { walletStatus.balanceAvailable ? "success" : "error" } 
      title= { walletStatus.message}
      extra={[
        <Button type="primary" key="history" onClick={()=> setActiveTab('history')}>
          Go History
        </Button>,
        <Button type="primary" key="wallet" onClick={()=> setActiveTab('wallet')}>
          Go Wallet
        </Button>,
      ]}
      />
    )
}
