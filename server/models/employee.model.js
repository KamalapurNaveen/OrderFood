var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
  name : String,
  email: String,
  salt : String,
  hash : String,
});

module.exports = mongoose.model("Employee", EmployeeSchema);