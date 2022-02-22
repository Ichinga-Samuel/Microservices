const dotenv = require('dotenv');
const {connectDB} = require('./connection');
const customers = require('./models/customer');

dotenv.config();

(async () => {await connectDB(); console.log("Database Connected")})()

async function create(name){
    try{
        return await customers.create({name: name, email: `${name}@gmail.com`, password: name})
    }
    catch(e){
        console.log(e)
        return null
    }
}

const names = ["Amaka", "Folake", "Ini", "Chinonye", "Amina", "Yetunde", "Chinenye", "Aisha", "Chikaodi"];

Promise.all(names.map(async name => await create(name))).then(res => {console.log(`Created ${res.length} customers`); process.exit(0)})
    .catch(e => {console.error(e); process.exit(0)})

