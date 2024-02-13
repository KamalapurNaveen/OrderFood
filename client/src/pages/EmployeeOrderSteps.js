import React from 'react';
import ResponsiveComponent from './ResponsiveComponent'; // Import the ResponsiveComponent
import eatImage from './eat.png'; // Import the image

// Your array of employee order steps
const employeeOrderSteps = [
  {
    step: 1,
    title: "Login & Signup",
    text: "Sign in or create an account to access employee features and functionalities. Ensure secure access to manage orders effectively.",
    image: "login_signup_image_url"
  },
  {
    step: 2,
    title: "Manage Menu",
    text: "Update and manage the menu items available for customers. Add new items, modify existing ones, or remove items as needed.",
    image: "manage_menu_image_url"
  },
  {
    step: 3,
    title: "Scanner Customers QR",
    text: "Use the QR code scanner to verify customer orders. Ensure that the QR codes provided by customers match the orders placed.",
    image: "scanner_qr_image_url"
  },
  {
    step: 4,
    title: "Add Items",
    text: "Manually add items to customer orders if necessary. This feature allows for flexibility in customizing orders based on customer preferences.",
    image: "add_items_image_url"
  },
  {
    step: 5,
    title: "Add Money to Users Wallet",
    text: "Manage customer wallet balances by adding funds as required. This feature facilitates seamless transactions and ensures customer satisfaction.",
    image: "add_money_wallet_image_url"
  },
  {
    step: 6,
    title: "Change Status of Order",
    text: "Update the status of customer orders to keep track of their progress. Mark orders as confirmed, in progress, or completed for efficient order management.",
    image: "change_order_status_image_url"
  }
];

const EmployeeOrderSteps = () => {
  return (
    <div>
      {employeeOrderSteps.map((step, index) => (
        <ResponsiveComponent
          key={index}
          imagePosition={index % 2 != 0 ? 'left' : 'right'} // Alternate between left and right for image position
          image={eatImage} // Pass the image
          title={step.title} // Pass the title
          displayText={step.text} // Pass the text
          showButton={(index===0)} // Employee steps do not have a login button
          user="employedd"
        />
      ))}
    </div>
  );
};

export default EmployeeOrderSteps;
