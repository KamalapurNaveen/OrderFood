var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['credit', 'debit'],
        required: true
    },
    amount: Number,
    message : String,
    orderId: {
        type : Schema.Types.ObjectId,
        red : 'Order',
        required : true
    },
    time: {
        type: Date,
        default: Date.now
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