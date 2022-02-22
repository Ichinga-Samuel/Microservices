const mongoose = require('mongoose')
const {customAlphabet} = require('nanoid');

const nanoid = customAlphabet('1234567890qwertyuioplkjhgfdsazxcvbnmMNBVCXZLKJHGFDSAPOIUYTREWQ', 7);

const OrderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        default: () => nanoid(),
        unique: true
    },

    customerId: String,

    productId: String,

    amount: Number,

    orderStatus:{
        type: String,
        enum: ['pending', 'complete'],
        default: 'pending'
    }

}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

module.exports = mongoose.model('orders', OrderSchema);
