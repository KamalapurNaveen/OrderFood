var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
  name      : String,
  email     : String,
  salt      : String,
  hash      : String,
  wallet_id : {
        type: Schema.Types.ObjectId,
        ref: 'Wallet',
        required: true
    },
});

module.exports = mongoose.model("Customer", CustomerSchema);