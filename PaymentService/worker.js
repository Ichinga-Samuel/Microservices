const amq = require('amqplib');
const dotenv = require('dotenv')

dotenv.config()

const queue1 = 'initiatepayment'
const queue2 = 'completepayment';
const conn = amq.connect(process.env.AMQP_URL).catch(e => console.log(e))

function payment(order){
    order.orderStatus = 'complete'
    return conn.then(conn => conn.createChannel()).then(channel => {
        channel.assertQueue(queue2).then(() => channel.sendToQueue(queue2, Buffer.from(JSON.stringify(order))))
    })
}

conn.then(conn => conn.createChannel()).then(channel => {
    channel.assertQueue(queue1).then(() => channel.consume(queue1, msg => {
        msg = msg.content.toString()
        let order = JSON.parse(msg)
        payment(order)
    }))
})
