const mongoose = require('mongoose');
const {customAlphabet} = require('nanoid');

const nanoid = customAlphabet('1234567890qwertyuioplkjhgfdsazxcvbnmMNBVCXZLKJHGFDSAPOIUYTREWQ', 7);

const CustomerSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true,
    },

    email:{
        type: String,
        index: {unique: true},
        required: true,
    },

    customerId: {
        type: String,
        default: () => nanoid(),
        unique: true
    },
    password: String

}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

module.exports = mongoose.model('customers', CustomerSchema);
