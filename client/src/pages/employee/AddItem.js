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
  // Function to check if input is a number
  function isNumber(input) {
      return !isNaN(input);
  }
  function resetData(e){
    e.target.reset();
  }
   function validation(newItem,e){
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
        return true;
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
        
        if(!validation(newItem,e)) {
          resetData(e)
          return ;
        }
        const addItem= async(values)=>{
          try{
            var response = await fetch("http://127.0.0.1:3500/api/_e/item/add", {
              method: "post",
              body: JSON.stringify(
                {
                  items : [{
                    name         : values.name,
                    description  : values.description,
                    image        : values.imageUrl,
                    max_limit    : values.maxLimit,
                    is_available : values.available,
                    cost         : values.price
                  }]
                }
              ),
              headers: {
                "Content-Type": "application/json"
              },
              credentials: "include",
            })
            var data = await response.json()
            console.log(data)
            if (data.success) {
                message.success("Item added successfully")
            }
            else{
              message.error("Error while adding item")
            }
          }
          catch(error){
            message.error("Error while adding item")
            console.log(error)
          }
  
        }
        addItem(newItem);

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
