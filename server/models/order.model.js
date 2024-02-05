const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderItemSchema = new Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    name: String,
    cost: Number,
    quantity: Number,
});

const OrderSchema = new Schema({
    items: [OrderItemSchema],
    cost: Number,
    time: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Order", OrderSchema);
