const dotenv = require('dotenv');
const orders = require('./models/orders')

const {connectDB, amq} = require('./connection')
dotenv.config()

connectDB().then(() => console.log("database running"))

const conn = amq().catch(e => console.log(e))

const queue = 'createorder'
const queue2 = 'initiatepayment'
const queue3 = 'completepayment';

async function createOrder(order){
    order = await orders.create(order)
    return order
}

async function makepayment(order){
    conn.then(conn => conn.createChannel()).then(channel => {
        channel.assertQueue(queue2).then(() => channel.sendToQueue(queue2, Buffer.from(JSON.stringify(order))))
    })
    return order
}

async function updateOrder(order){
    return orders.findOneAndUpdate({orderId: order.orderId}, {orderStatus: order.orderStatus}, {new: true})
}

conn.then(conn => conn.createChannel()).then(channel => {
    channel.assertQueue(queue).then(() => channel.consume(queue, msg => {
        let order = JSON.parse(msg.content.toString())
        createOrder(order).then(order => {
            channel.ack(msg)
            makepayment(order).then()
        })
    }, {noAck: false}))
})


conn.then(conn => conn.createChannel()).then(channel => {
    channel.assertQueue(queue3).then(() => channel.consume(queue3, msg => {
        let order = JSON.parse(msg.content.toString())
        updateOrder(order).then(order => {
            if(order) channel.ack(msg)
        })
    }, {noAck: false}))
})
