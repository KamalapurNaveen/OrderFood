const QRCode = require('qrcode');

// Generate random data for key-value pairs
const data = {
  name: 'John Doe',
  age: 25,
  city: 'Example City',
  email: 'john@example.com',
};

// Convert key-value pairs to a string
const textData = Object.entries(data).map(([key, value]) => `${key}: ${value}`).join('\n');

// Options for generating the QR code
const options = {
  color: {
    dark: '#000', // Dark color
    light: '#fff', // Light color
  },
};

// Generate the QR code and save it as an image file
QRCode.toFile('dataQRCode.png', textData, options, (err) => {
  if (err) {
    console.error('Error generating QR code:', err);
  } else {
    console.log('QR code generated and saved successfully.');
  }
});
