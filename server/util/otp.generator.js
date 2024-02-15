function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function get4DigitPin() {
    const pinLength = 4;
    let pin = '';
    for (let i = 0; i < pinLength; i++) {
      pin += getRandomInt(0, 9); 
    }
    return pin;
  }
  
  function get6DigitPin() {
    const pinLength = 6;
    let pin = '';
    for (let i = 0; i < pinLength; i++) {
      pin += getRandomInt(0, 9); 
    }
    return pin;
  }
  
  module.exports = {get4DigitPin, get6DigitPin}
  