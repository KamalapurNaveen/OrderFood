import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import RecentOrders from './RecentOrders';
import Profile from './Profile';
import Cart from './Cart';
import Menu from './Menu';
import NavBar from "../../components/customerNavBar";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('menu');

  let activeComponent;
  switch (activeTab) {
    case 'menu':
      activeComponent = <Menu setActiveTab={setActiveTab}/>;
      break;
    case 'cart':
      activeComponent = <Cart setActiveTab={setActiveTab}/>;
      break;
    case 'recent-orders':
      activeComponent = <RecentOrders />;
      break;
    case 'profile':
      activeComponent = <Profile />;
      break;
    default:
      activeComponent = null;
  }

  return (
    <div className='my-nav' style={{ backgroundColor: "rgba(195, 195, 195, 0.33)" }}>
      <NavBar setActiveTab={setActiveTab} activeTab={activeTab} />
      <Container className="mt-4" style={{minHeight : "90vh"}}>
        {activeComponent}
      </Container>
    </div>
  );
};

export default Dashboard;
