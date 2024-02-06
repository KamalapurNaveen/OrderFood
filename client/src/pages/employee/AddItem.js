import React from 'react';
import { Form, Button } from 'react-bootstrap';

const AddItem = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newItem = {
          name: formData.get('itemName'),
          price: formData.get('itemPrice'),
          description: formData.get('itemDescription'),
          imageUrl: formData.get('itemImageUrl'),
          available: formData.get('itemAvailability') === 'on', // Convert to boolean
        };
        console.log(newItem);
        e.target.reset();
    };
      

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formItemName">
          <Form.Label>Item Name</Form.Label>
          <Form.Control type="text" name="itemName" placeholder="Enter item name" />
        </Form.Group>
        <Form.Group controlId="formItemPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control type="text" name="itemPrice" placeholder="Enter item price" />
        </Form.Group>
        <Form.Group controlId="formItemDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" name="itemDescription" placeholder="Enter item description" />
        </Form.Group>
        <Form.Group controlId="formItemImageUrl">
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" name="itemImageUrl" placeholder="Enter item image URL" />
        </Form.Group>
        <br></br>
        <Form.Group controlId="formItemAvailability">
          <Form.Check type="checkbox" name="itemAvailability" label="Available" />
        </Form.Group>
        
        <div className="text-center">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddItem;
