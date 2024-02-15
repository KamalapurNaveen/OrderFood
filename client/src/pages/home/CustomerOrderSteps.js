import React from 'react';
import ResponsiveComponent from './ResponsiveComponent'; 
import eatImage from '../assets/eat.png'; // Import the image
import payment from '../assets/payment.png';
import qr from '../assets/qr.png';
import menu from '../assets/menu.png';
import cart from '../assets/cart.png';
import scanner from "../assets/scanner.png"
import signup from '../assets/signup.png'
import spoons from "../assets/spoons.png"


const orderFoodSteps = [
  {
    step: 1,
    title: "Login and Signup",
    text: "Sign in or create an account to start ordering your favorite meals. Enjoy a seamless experience tailored just for you.",
    image: signup
  },
  {
    step: 2,
    title: "Explore Menu and Select Items",
    text: "Browse through our extensive menu featuring a variety of mouth-watering dishes. From appetizers to desserts, we have something for everyone. Select your desired items and add them to your cart.",
    image: menu
  },
  {
    step: 3,
    title: "View Items in Cart",
    text: "Review your selected items before proceeding to checkout. Make any adjustments if needed, and ensure your order is accurate before finalizing.",
    image: cart
  },
  {
    step: 4,
    title: "Make Payment",
    text: "Proceed to payment and choose your preferred payment method. Rest assured, our payment gateway is safe and secure, ensuring your transactions are protected.",
    image: payment
  },
  {
    step: 5,
    title: "Get QR Code",
    text: "After successful payment, you'll receive a unique QR code. This code will be used to confirm your order at the canteen.",
    image: qr
  },
  {
    step: 6,
    title: "QR Code Scanned by Canteener",
    text: "Present your QR code at the canteen counter for order verification. Our staff will quickly scan your code to confirm your order details.",
    image: scanner
  },
  {
    step: 7,
    title: "Get Food and Eat",
    text: "Once your order is confirmed, sit back and relax. Your delicious meal will be prepared fresh and ready for pickup. Bon appétit!",
    image: spoons
  }
];

const CustomerOrderSteps = () => {
  return (
    <div>

      {orderFoodSteps.map((step, index) => (
        <ResponsiveComponent
          key={index}
          imagePosition={index % 2 === 0 ? 'left' : 'right'} // Alternate between left and right for image position
          image={step.image} // Pass the image
          title={step.title} // Pass the title
          displayText={step.text} // Pass the text
          showButton={(index===0)}
          user="customer"
        />
      ))}
    </div>
  );
};

export default CustomerOrderSteps;
