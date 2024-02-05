var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    name         : String,
    description  : String,
    image        : String,
    max_limit    : Number,
    is_available : Boolean,
    cost         : Number,
    updatedAt    : {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Item", ItemSchema);