import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import RecentOrders from './RecentOrders';
import Scanner from './Scanner';
import UpcomingOrders from './UpcomingOrders';
import ManageMenu from './ManageMenu';
import Profile from './Profile';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('scanner');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='my-nav'>
      <Navbar bg="dark" variant="dark" expand="lg" className="justify-content-between">
        <Container>
          <Navbar.Brand>
            <img
              alt="Logo"
              src="/path/to/your/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Your Title
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="mr-auto">
              <Nav.Link href="#scanner" onClick={() => handleTabClick('scanner')} className={activeTab === 'scanner' ? 'active' : ''}>Scanner</Nav.Link>
              <Nav.Link href="#manage-menu" onClick={() => handleTabClick('manage-menu')} className={activeTab === 'manage-menu' ? 'active' : ''}>Manage Menu</Nav.Link>
              <Nav.Link href="#recent-orders" onClick={() => handleTabClick('recent-orders')} className={activeTab === 'recent-orders' ? 'active' : ''}>Recent Orders</Nav.Link>
              <Nav.Link href="#upcoming-orders" onClick={() => handleTabClick('upcoming-orders')} className={activeTab === 'upcoming-orders' ? 'active' : ''}>Upcoming Orders</Nav.Link>
              <Nav.Link href="#profile" onClick={() => handleTabClick('profile')} className={activeTab === 'profile' ? 'active' : ''}>Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        {activeTab === 'scanner' && <Scanner />}
        {activeTab === 'manage-menu' && <ManageMenu />}
        {activeTab === 'upcoming-orders' && <UpcomingOrders />}
        {activeTab === 'recent-orders' && <RecentOrders />}
        {activeTab === 'profile' && <Profile />}
        {/* Add similar content for other tabs */}
      </Container>
    </div>
  );
};

export default Dashboard;
