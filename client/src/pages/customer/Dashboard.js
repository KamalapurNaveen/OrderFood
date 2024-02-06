import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import RecentOrders from './RecentOrders';
import Profile from './Profile';
import Cart from './Cart';
import Menu from './Menu';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('menu');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='my-nav'>
      <Navbar bg="dark" variant="dark" expand="lg" className="justify-content-between">
        <Container>
          <Navbar.Brand style={{marginRight:"50%"}}>
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
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#scanner" onClick={() => handleTabClick('menu')} className={activeTab === 'menu' ? 'active' : ''}>Menu</Nav.Link>
              <Nav.Link href="#recent-orders" onClick={() => handleTabClick('recent-orders')} className={activeTab === 'recent-orders' ? 'active' : ''}>Recent Orders</Nav.Link>
              <Nav.Link href="#cart" onClick={() => handleTabClick('cart')} className={activeTab === 'cart' ? 'active' : ''}>Cart</Nav.Link>
              <Nav.Link href="#profile" onClick={() => handleTabClick('profile')} className={activeTab === 'profile' ? 'active' : ''}>Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        {activeTab === 'menu' && <Menu />}
        {activeTab === 'cart' && <Cart />}
        {activeTab === 'recent-orders' && <RecentOrders />}
        {activeTab === 'profile' && <Profile />}
        {/* Add similar content for other tabs */}
      </Container>
    </div>
  );
};

export default Dashboard;
