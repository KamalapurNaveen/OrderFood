import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNav } from '../NavContext';
import logo from "../../logon.png"
export default function NavBar(){
    const { setActiveTab , activeTab} = useNav()
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="justify-content-between">
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
                    <Nav.Link href="#scanner" onClick={() => handleTabClick('scanner')} className={activeTab === 'scanner' ? 'active' : ''}>Scanner</Nav.Link>
                    <Nav.Link href="#menu" onClick={() => handleTabClick('menu')} className={activeTab === 'menu' ? 'active' : ''}>Menu</Nav.Link>
                    <Nav.Link href="#orders" onClick={() => handleTabClick('orders')} className={activeTab === 'orders' ? 'active' : ''}>Orders</Nav.Link>
                    <Nav.Link href="#profile" onClick={() => handleTabClick('profile')} className={activeTab === 'profile' ? 'active' : ''}>Profile</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}