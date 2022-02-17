const mongoose = require('mongoose')
const {v4: uuid} = require('uuid');

const OrderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        default: uuid,
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
