import { Navbar, Nav, Container } from 'react-bootstrap';

export default function NavBar({ setActiveTab , activeTab}){
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    return (
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
                <Nav.Link href="#menu" onClick={() => handleTabClick('menu')} className={activeTab === 'menu' ? 'active' : ''}>Menu</Nav.Link>
                <Nav.Link href="#cart" onClick={() => handleTabClick('cart')} className={activeTab === 'cart' ? 'active' : ''}>Cart</Nav.Link>
                <Nav.Link href="#orders" onClick={() => handleTabClick('recent-orders')} className={activeTab === 'recent-orders' ? 'active' : ''}>Recent Orders</Nav.Link>
                <Nav.Link href="#profile" onClick={() => handleTabClick('profile')} className={activeTab === 'profile' ? 'active' : ''}>Profile</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}