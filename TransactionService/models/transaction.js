const mongoose = require('mongoose');
const {customAlphabet} = require('nanoid');

const nanoid = customAlphabet('1234567890qwertyuioplkjhgfdsazxcvbnmMNBVCXZLKJHGFDSAPOIUYTREWQ', 7);

const TransactionSchema = new mongoose.Schema({
    transactionId:{
        type: String,
        required: true,
        default: () => nanoid()
    },
    customerId:{
        type: String,
        required: true,
    },
    orderId:{
        type: String,
        required: true,
    },
    productId:{
        type: String,
        required: true,
    },
    amount:{
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('transactions', TransactionSchema)