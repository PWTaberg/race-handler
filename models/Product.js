const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ProductSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Enter a product name']
    },
    price: {
        type: Number,
        required: [true, 'Enter a price']
    },
    amount: {
        type: Number,
        required: [true, 'Enter an amount']
    },
    info: {
        type: String
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L', '-'],
        default: '-'
    }
});

module.exports = mongoose.model('Product', ProductSchema);