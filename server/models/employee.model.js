var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var {get4DigitPin} = require('../util/otp.generator')

var EmployeeSchema = new Schema({
  name : String,
  email: String,
  salt : String,
  hash : String,
  otp: {
    type: String,
    default: get4DigitPin 
  },
  otpUpdatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Employee", EmployeeSchema);