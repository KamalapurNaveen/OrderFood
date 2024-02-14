import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { message } from 'antd';

const AddItem = () => {
    function isNotNull(input) {
        return input !== null;
    }

    function isNotEmpty(input) {
      if (typeof input !== 'string') return false; 
      return input.trim() !== '';
    }
  
    function isNumber(input) {
        return !isNaN(input);
    }

    function resetData(e) {
        e.target.reset();
    }

    function validation(newItem,e){
      for(let item in  newItem){
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
      return true;
    }

      const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', e.target.elements.itemName.value);
        formData.append('cost', e.target.elements.itemPrice.value);
        formData.append('max_limit', e.target.elements.itemMaxLimit.value);
        formData.append('description', e.target.elements.itemDescription.value);
        formData.append('is_available', e.target.elements.itemAvailability.checked ? true : false);
        formData.append('itemImage', e.target.elements.itemImage.files[0]);
        
        const newItem = {
            name: e.target.elements.itemName.value,
            price: e.target.elements.itemPrice.value,
            maxLimit: e.target.elements.itemMaxLimit.value,
            description: e.target.elements.itemDescription.value,
            available: e.target.elements.itemAvailability.checked
        };
        console.log(formData)
        if(!validation(newItem,e)) {
          resetData(e)
          return ;
        }

        const addItem = async (formData) => {
            try {
                const response = await fetch("http://localhost:3500/api/_e/item/add", {
                    method: "POST",
                    body: formData,
                    credentials: "include",
                });
                const data = await response.json();
                if (data.success) {
                    message.success("Item added successfully");
                } else {
                    message.error("Error while adding item");
                }
            } catch (error) {
                message.error("Error while adding item");
                console.log(error);
            }
        };
        
        addItem(formData, newItem);
      };


    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formItemName" className="mb-3">
                    <Form.Label className="mr-2 font-weight-bold">Item Name</Form.Label>
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
                <Form.Group controlId="formItemImage" className="mb-3">
                    <Form.Label className="mr-2 font-weight-bold">Upload Image</Form.Label>
                    <Form.Control type="file" name="itemImage" />
                </Form.Group>
                <Form.Group controlId="formItemMaxLimit" className="mb-3">
                    <Form.Label className="mr-2 font-weight-bold">Maximum Limit</Form.Label>
                    <Form.Control type="text" name="itemMaxLimit" placeholder="Enter max limit" />
                </Form.Group>
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
