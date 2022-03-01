const dotenv = require('dotenv');
const {connectDB, amq} = require('./connection');
const products = require('./models/products')

dotenv.config();

const conn = amq().catch(e => console.error(e));

(async () => {await connectDB(); console.log('Connected to Database')})()

queue = 'products';
queue2 = 'getproducts'

async function getproducts(){
    try{
        return await products.find({}).sort('amount')
    }
    catch(e){
        console.error(e)
        return {}
    }
}

async function get(){

    return conn.then(conn => conn.createChannel()).then(channel => {
        let prods = {}
        getproducts().then(res => {prods = res})
        channel.assertQueue(queue, {durable: true}).then(() => channel.sendToQueue(queue, Buffer.from(JSON.stringify(prods)), {persistent: true}))
    })

}

conn.then(conn => conn.createChannel()).then(channel => {
    channel.assertQueue(queue2).then(() => channel.consume(queue2, msg => {
        get().then(() => 'sending products')
        channel.ack(msg)
    }, {noAck: false}))
})

