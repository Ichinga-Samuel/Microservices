const mongoose = require('mongoose');
const {v4: uuid} = require('uuid');

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
        default: uuid,
        unique: true
    },

    password: String


}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

module.exports = mongoose.model('customers', CustomerSchema);
