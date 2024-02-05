var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['credit', 'debit'],
        required: true
    },
    amount: Number,
    orderId: {
        type : Schema.Types.ObjectId,
        red : 'Order',
        required : true
    },
});

var WalletSchema = new Schema({
    balance : {
        type: Number,
        default: 0
    },
    transactions : {
        type : [transactionSchema],
        default: []
    },
});

module.exports = mongoose.model("Wallet", WalletSchema);