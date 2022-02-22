const dotenv = require('dotenv');
const transaction = require('./models/transaction');
const {connectDB, amq} = require('./connection');

dotenv.config()

connectDB().then(() => console.log("Database Connected"));

const conn = amq().catch(e => console.error(e))

const queue = 'transactions'
const queue2 = 'gettransactions'
const queue3 = 'transactioncomplete'

async function create(trans){
    return await transaction.create(trans)
}

async function get(){
    return await transaction.find({}).sort('-createdAt')
}

async function send(trans){
    conn.then(conn => conn.createChannel()).then(channel => {
        channel.assertQueue(queue3).then(() => channel.sendToQueue(queue3, Buffer.from(JSON.stringify(trans))))
    })
}

// get completed order and create a transaction.
// send the transaction to the completed transactions queue
conn.then(conn => conn.createChannel()).then(channel => {
    channel.assertQueue(queue).then(() => {
        channel.consume(queue, msg => {
            let trans = JSON.parse(msg.content.toString())
            create(trans).then(res => {send(res).then(() => {}); channel.ack(msg)}).catch(err => {console.error(err); channel.ack(msg)})

        }, {noAck: false})
    })
})

// get all transactions
conn.then(conn => conn.createChannel()).then(channel => {
    let transactions = [];
    get().then(res => {transactions = res})
    channel.assertQueue(queue2).then(() => channel.sendToQueue(queue2, Buffer.from(JSON.stringify(transactions))))
})

