var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var {get4DigitPin} = require('../util/otp.generator')
var {sendEmployeePinMail} = require('../services/mail.service')

var EmployeeSchema = new Schema({
  name : String,
  email: {type : String, index : true},
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

EmployeeSchema.post("save", function (doc) {
  sendEmployeePinMail({ email: doc.email, name: doc.name, pin: doc.otp });
});

module.exports = mongoose.model("Employee", EmployeeSchema);