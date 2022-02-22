const mongoose = require('mongoose');
const {customAlphabet} = require('nanoid');

const nanoid = customAlphabet('1234567890qwertyuioplkjhgfdsazxcvbnmMNBVCXZLKJHGFDSAPOIUYTREWQ', 7);

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    productId:{
        type: String,
        default: () => nanoid()
    },
    amount: Number,
    quantity:{
        type: Number,
        default: 1
    },
    imageUrl:{
        type: String,
        default: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
}}, {timestamps: true})

module.exports = mongoose.model('products', ProductSchema)