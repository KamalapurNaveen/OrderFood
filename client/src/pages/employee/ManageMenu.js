import React, { useState } from 'react';
import { Button, Container, Row, Col, Card, Modal, Form, Nav } from 'react-bootstrap';

const ManageMenu = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', description: 'Description 1', price: '10.00', imageUrl: 'https://example.com/image1.jpg', available: true },
    { id: 2, name: 'Item 2', description: 'Description 2', price: '15.00', imageUrl: 'https://example.com/image2.jpg', available: false },
    { id: 3, name: 'Item 3', description: 'Description 3', price: '20.00', imageUrl: 'https://example.com/image3.jpg', available: true },
    // Add more items as needed
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    available: true,
  });

  const handleAvailability = (itemId, status) => {
    // Implement your logic to handle availability (e.g., update state or make an API call)
    console.log(`${status} clicked for Item ${itemId}`);
    const updatedItems = items.map((item) => (item.id === itemId ? { ...item, available: !item.available } : item));
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveItem = () => {
    const newItemWithId = {
      ...newItem,
      id: items.length + 1,
    };

    setItems([...items, newItemWithId]);
    setNewItem({
      name: '',
      description: '',
      price: '',
      imageUrl: '',
      available: true,
    });
    setShowModal(false);
  };

  const availableItems = items.filter((item) => item.available);
  const unavailableItems = items.filter((item) => !item.available);

  return (
    <div className='container'>
      <Container>
        <Row className="justify-content-center">
          <Col xs="auto">
            <Button variant="primary" onClick={handleAddItem}>
              Add Item
            </Button>
          </Col>
          <Col xs="auto">
            <Button variant="danger">Remove Item</Button>
          </Col>
        </Row>
        <br></br>
        <br></br>
        <Nav variant="tabs" defaultActiveKey="all">
          <Nav.Item>
            <Nav.Link eventKey="all">All Items</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="available">Available Items</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="unavailable">Unavailable Items</Nav.Link>
          </Nav.Item>
        </Nav>
        <Row>
          {items.map((item) => (
            <Col key={item.id} xs={12} sm={6} md={4} lg={10} className="mb-3">
              <Card className="shadow">
                <Card.Body style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Card.Title>{item.name}</Card.Title>
                  <div>
                    <span>Status: {item.available ? 'Available' : 'Unavailable'}</span>{' '}
                    {item.available ? (
                      <Button variant="danger" onClick={() => handleAvailability(item.id, 'Unavailable')}>
                        Make Unavailable
                      </Button>
                    ) : (
                      <Button variant="success" onClick={() => handleAvailability(item.id, 'Available')}>
                        Make Available
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Modal for adding items */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formItemName">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter item name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formItemDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter item description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formItemPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter item price"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formItemImageUrl">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter item image URL"
                  value={newItem.imageUrl}
                  onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formItemAvailability">
                <Form.Check
                  type="checkbox"
                  label="Available"
                  checked={newItem.available}
                  onChange={(e) => setNewItem({ ...newItem, available: e.target.checked })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveItem}>
              Save Item
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      
    </div>
  );
};

export default ManageMenu;
