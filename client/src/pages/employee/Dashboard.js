import React, { useState,useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import RecentOrders from './RecentOrders';
import Scanner from './Scanner';
import UpcomingOrders from './UpcomingOrders';
import ManageMenu from './Menu';
import Profile from './Profile';
import Orders from './Orders';
import logo from "../logon.png"
import Wallet from './Wallet';
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('scanner');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const [contentHeight, setContentHeight] = useState('100vh'); // Initial height set to 100vh

  useEffect(() => {
    const resizeListener = () => {
      const windowHeight = window.innerHeight;
      const containerHeight = document.getElementById('container').scrollHeight;
      setContentHeight(containerHeight > windowHeight ? 'fit-content' : '100vh');
    };

    window.addEventListener('resize', resizeListener);
    resizeListener(); // Call resize listener initially
    return () => window.removeEventListener('resize', resizeListener);
  }, []);
  return (
    <div className='my-nav' id="container" style={{ height: contentHeight, overflowY: 'auto' , backgroundColor: "rgba(195, 195, 195, 0.33)" } }>
      <Navbar bg="dark" variant="dark" expand="lg" className="justify-content-between">
        <Container>
          <Navbar.Brand>
            <img
              alt="Logo"
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            QR-IT
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="mr-auto">
              <Nav.Link href="#scanner" onClick={() => handleTabClick('scanner')} className={activeTab === 'scanner' ? 'active' : ''}>Scanner</Nav.Link>
              <Nav.Link href="#menu" onClick={() => handleTabClick('menu')} className={activeTab === 'menu' ? 'active' : ''}>Menu</Nav.Link>
              <Nav.Link href="#wallet" onClick={() => handleTabClick('wallet')} className={activeTab === 'wallet' ? 'active' : ''}>Wallet</Nav.Link>
              <Nav.Link href="#orders" onClick={() => handleTabClick('orders')} className={activeTab === 'orders' ? 'active' : ''}>Orders</Nav.Link>
              <Nav.Link href="#profile" onClick={() => handleTabClick('profile')} className={activeTab === 'profile' ? 'active' : ''}>Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4" style={{minHeight : "90vh"}}>
        {activeTab === 'scanner' && <Scanner />}
        {activeTab === 'menu' && <ManageMenu />}
        {activeTab === 'wallet' && <Wallet />}
        {activeTab === 'orders' && <Orders />}
        {activeTab === 'profile' && <Profile />}
        {/* Add similar content for other tabs */}
      </Container>
    </div>
  );
};

export default Dashboard;
