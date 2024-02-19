
# QR-It(Food Delivery Website)

The Food Ordering Website for Employees is a web application designed to streamline the process of ordering food for employees within an organization. The application allows employees to view the daily menu, place orders, make payments, and receive a QR code for their orders. Canteen workers can then scan these QR codes to access order details.




## Installation

- Clone this project 

    ```bash
      git clone https://github.com/KamalapurNaveen/OrderFood.git
    
    ```
- Navigate to client and install node modules

    ```bash
    npm install or 
    npm i
    ```
- Navigate to server and install node modules

    ```bash
    npm install or 
    npm i
    
    ```
    And you should configure your own env file similar to this:
    ``` 
    PORT=
    JWT_KEY=
    FORGET_PASSWORD_KEY=
    MONGO_URL_TEST=
    MONGO_URL=
    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY=
    S3_REGION=
    S3_BUCKET=
    NODEMAILER_EMAIL=
    NODEMAILER_PWD=
    
    ```
- You can run in two ways: 
  - Running both client and server in different ports.
    ```bash
    client> npm start
    server>  npm start
    ```
   - Building client and placing in public folder of server.
        ```bash
        client> npm run build
        server> npm start
        ```




## Customer Flow


- **Login and Signup**:
  Sign in or create an account to start ordering your favorite meals. Enjoy a seamless experience tailored just for you.

- **Explore Menu and Select Items**:
  Browse through our extensive menu featuring a variety of mouth-watering dishes. From appetizers to desserts, we have something for everyone. Select your desired items and add them to your cart.

- **View Items in Cart**:
  Review your selected items before proceeding to checkout. Make any adjustments if needed, and ensure your order is accurate before finalizing.

- **Make Payment**:
  Proceed to payment and choose your preferred payment method. Rest assured, our payment gateway is safe and secure, ensuring your transactions are protected.

- **Get QR Code**:
  After successful payment, you'll receive a unique QR code. This code will be used to confirm your order at the canteen.

- **QR Code Scanned by Canteener**:
  Present your QR code at the canteen counter for order verification. Our staff will quickly scan your code to confirm your order details.

- **Get Food and Eat**:
  Once your order is confirmed, sit back and relax. Your delicious meal will be prepared fresh and ready for pickup. Bon appétit!


##  Employee Flow

- **Login**:
  Sign in  to access employee features and functionalities. Ensure secure access to manage orders effectively.

- **Manage Menu**:
  Update and manage the menu items available for customers. Add new items, modify existing ones, or remove items as needed.

- **Scan Customers QR**:
  Use the QR code scanner to verify customer orders. Ensure that the QR codes provided by customers match the orders placed.

- **Add Items**:
  Manually add items to customer orders if necessary. This feature allows for flexibility in customizing orders based on customer preferences.

- **Add Money to Users Wallet**:
  Manage customer wallet balances by adding funds as required. This feature facilitates seamless transactions and ensures customer satisfaction.

- **Change Status of Item**:
  Update the status of customer orders to keep track of their progress. Mark orders as confirmed, in progress, or completed for efficient order management.

- **View Recent Orders**:
  Access a list of recent orders to review past transactions and customer preferences. Analyze order history for insights and improvements.

- **View Upcoming Orders**:
  Preview and prepare for upcoming orders scheduled for processing. Stay ahead of customer demand and ensure timely order fulfillment.


## Tech Stack

**Client:** React, Bootstrap, AntDesign, FramerMotion

**Server:** Node, Express, MongoDB

