import React, { useState } from 'react';
import { Card } from 'antd';
import Scanner from './Scanner';
import AddItem from './AddItem';
import AllItems from './AllItems';
import AvailableItems from './AvailableItems';
import UnavailableItems from './UnavailableItems';
const tabList = [
  {
    key: 'tab1',
    tab: 'All Items',
  },
  {
    key: 'tab2',
    tab: 'Available Items',
  },
  {
    key: 'tab3',
    tab: 'Unavailable Items',
  },
  {
    key: 'tab4',
    tab: 'Add Items',
  },

];
const contentList = {
  tab1: <AllItems/>,
  tab2: <AvailableItems/>,
  tab3: <UnavailableItems/>,
  tab4: <div><AddItem/></div>
};

const Menu = () => {

  const [activeTabKey1, setActiveTabKey1] = useState('tab1');

  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };
 
  return (
    <>
    
        
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
    
     
    </>
  );
};
export default Menu;



  