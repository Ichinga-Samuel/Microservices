const dotenv = require('dotenv');
const {connectDB} = require('./connection');
const products = require('./models/products');

dotenv.config()

connectDB().then(() => console.log('Connected to Database'));

async function createProduct(name){
    // choose random amount between 1000, and 20, 000
    try{
        const amount = () => Math.floor(Math.random()*(20000-1000)+1000)
        return await products.create({name: name, amount: amount(), })
    }
    catch(e){
        // console.error(e);
        return null
    }
    
}

const prod = ["Fan", "Fridge", "AC", "Electric Iron", "HP Laptop", "Xbox 360 Console", "PS 5", "Galaxy S22", "Apple Watch"];

Promise.all(prod.map(async name => await createProduct(name))).then(res => {console.log(`${res.length} Products Created`); process.exit(0)}).catch(e => {console.error(e); process.exit(0)});
