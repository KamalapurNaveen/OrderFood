import React from 'react';
import ResponsiveComponent from './ResponsiveComponent'; // Import the ResponsiveComponent
import eatImage from './eat.png'; 
import wallet from './wallet.png';
import scanner from "./scanner.png"
import menu from "./menu.png"
import signin from "./signin.png"
import addItem from "./additem.png"
import history from "./history.png"
// Your array of employee order steps
const employeeOrderSteps = [
  {
    step: 1,
    title: "Login",
    text: "Sign in or create an account to access employee features and functionalities. Ensure secure access to manage orders effectively.",
    image: signin
  },
  {
    step: 2,
    title: "Manage Menu",
    text: "Update and manage the menu items available for customers. Add new items, modify existing ones, or remove items as needed.",
    image: menu
  },
  {
    step: 3,
    title: "Scan Customers QR",
    text: "Use the QR code scanner to verify customer orders. Ensure that the QR codes provided by customers match the orders placed.",
    image: scanner
  },
  {
    step: 4,
    title: "Add Items",
    text: "Manually add items to customer orders if necessary. This feature allows for flexibility in customizing orders based on customer preferences.",
    image: addItem
  },
  {
    step: 5,
    title: "Add Money to Users Wallet",
    text: "Manage customer wallet balances by adding funds as required. This feature facilitates seamless transactions and ensures customer satisfaction.",
    image: wallet
  },
  {
    step: 6,
    title: "Change Status of Order",
    text: "Update the status of customer orders to keep track of their progress. Mark orders as confirmed, in progress, or completed for efficient order management.",
    image: eatImage
  },
  {
    step: 7,
    title: "View Recent Orders",
    text: "Access a list of recent orders to review past transactions and customer preferences. Analyze order history for insights and improvements.",
    image: history
  },
  {
    step: 8,
    title: "View Upcoming Orders",
    text: "Preview and prepare for upcoming orders scheduled for processing. Stay ahead of customer demand and ensure timely order fulfillment.",
    image: eatImage
  }
];

const EmployeeOrderSteps = () => {
  return (
    <div>
      {employeeOrderSteps.map((step, index) => (
        <ResponsiveComponent
          key={index}
          imagePosition={index % 2 != 0 ? 'left' : 'right'} // Alternate between left and right for image position
          image={step.image} // Pass the image
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
