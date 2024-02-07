import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { message } from 'antd';
const AddItem = () => {
  function isNotNull(input) {
    return input !== null;
  }

  // Function to check if input is not empty
  function isNotEmpty(input) {
      return input !== undefined && input.trim() !== '';
  }

  // Function to check if input is a string
  function isString(input) {
      return typeof input === 'string';
  }

  // Function to check if input is a number
  function isNumber(input) {
      return !isNaN(input);
  }
  function resetData(e){
    e.target.reset();
  }
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newItem = {
          name: formData.get('itemName'),
          price: formData.get('itemPrice'),
          maxLimit: formData.get('itemMaxLimit'),
          description: formData.get('itemDescription'),
          imageUrl: formData.get('itemImageUrl'),
          available: formData.get('itemAvailability') === 'on', // Convert to boolean
        };
        for(let item in  newItem){
          console.log(newItem[item])
          if(item==='available') continue;
          if(!(isNotEmpty(newItem[item]) && isNotNull(newItem[item]))){
              message.error("Input can not be empty");
              resetData(e);
              return;
          }
          if((((item==='price') || (item==='maxLimit')) && !(isNumber(Number(newItem[item]))))){
            message.error("Price and MaxLimit should be number");
            resetData(e);
            return;
        }
        }
        message.success("Item added succesfully")
        e.target.reset();
    };
      

  return (
    <div>
     <Form onSubmit={handleSubmit}>
  <Form.Group controlId="formItemName" className="mb-3">
    <Form.Label className="mr-2  font-weight-bold" style={{fontWeight:"550"}}>Item Name</Form.Label>
    <Form.Control type="text" name="itemName" placeholder="Enter item name" />
  </Form.Group>
  <Form.Group controlId="formItemPrice" className="mb-3">
    <Form.Label className="mr-2 font-weight-bold">Price</Form.Label>
    <Form.Control type="text" name="itemPrice" placeholder="Enter item price" />
  </Form.Group>
  <Form.Group controlId="formItemDescription" className="mb-3">
    <Form.Label className="mr-2 font-weight-bold">Description</Form.Label>
    <Form.Control type="text" name="itemDescription" placeholder="Enter item description" />
  </Form.Group>
  <Form.Group controlId="formItemImageUrl" className="mb-3">
    <Form.Label className="mr-2 font-weight-bold">Image URL</Form.Label>
    <Form.Control type="text" name="itemImageUrl" placeholder="Enter item image URL" />
  </Form.Group>
  <Form.Group controlId="formItemMaxLimit" className="mb-3">
    <Form.Label className="mr-2 font-weight-bold">Maximum Limit</Form.Label>
    <Form.Control type="text" name="itemMaxLimit" placeholder="Enter max limit" />
  </Form.Group>
  <br />
  <Form.Group controlId="formItemAvailability" className="mb-3">
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
