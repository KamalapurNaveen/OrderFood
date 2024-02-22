import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNav } from '../NavContext';
import logo from "../../assets/logon.png"
import { useEffect, useState } from 'react';

export default function NavBar(){
    const {cartItems, setActiveTab , activeTab} = useNav()
    var cartCount = Object.values(cartItems).reduce((p, d) => p + d.quantity, 0)
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="justify-content-between" fixed="top" style={{position: "sticky"}} >
            <Container>
            <Navbar.Brand style={{marginRight:"50%"}}>
                <img
                alt="#"
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                />{' '}
                QRIT
            </Navbar.Brand>

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#menu" onClick={() => handleTabClick('menu')} className={activeTab === 'menu' ? 'active' : ''}>Menu</Nav.Link>
                    <Nav.Link href="#cart" onClick={() => handleTabClick('cart')} className={activeTab === 'cart' ? 'active' : ''}>Cart <span class="badge rounded-pill text-bg-primary">{cartCount}</span></Nav.Link>
                    <Nav.Link href="#history" onClick={() => handleTabClick('history')} className={activeTab === 'history' ? 'active' : ''}>History</Nav.Link>
                    <Nav.Link href="#wallet" onClick={() => handleTabClick('wallet')} className={activeTab === 'wallet' ? 'active' : ''}>Wallet</Nav.Link>
                    <Nav.Link href="#profile" onClick={() => handleTabClick('profile')} className={activeTab === 'profile' ? 'active' : ''}>Profile</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}