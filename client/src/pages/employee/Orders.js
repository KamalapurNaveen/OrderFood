import React, { useState } from 'react';
import { Card } from 'antd';
import RecentOrders from './RecentOrders';
import UpcomingOrders from './UpcomingOrders';
const tabList = [
  {
    key: 'tab1',
    tab: 'Recent Orders',
  },
  {
    key: 'tab2',
    tab: 'Upcoming Orders',
  },
];
const contentList = {
  tab1: <RecentOrders/>,
  tab2: <UpcomingOrders/>
};

const Orders = () => {
  const [activeTabKey1, setActiveTabKey1] = useState('tab1');
 
  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };
  return (
    <div className='container'>
      <Card
        style={{
          width: '100%',
        }}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
      >
        {contentList[activeTabKey1]}
      </Card>
     
    </div>
  );
};
export default Orders;