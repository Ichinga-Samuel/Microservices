const amq = require('amqplib');
const dotenv = require('dotenv');

dotenv.config();

const queue1 = 'initiatepayment'
const queue2 = 'completepayment';
const queue3 = 'transactions'
const conn = amq.connect(process.env.AMQP_URL).catch(e => console.error(e))

function payment(order){
    order.orderStatus = 'complete'
    let trans = {productId: order.productId, customerId: order.customerId, amount: order.amount, orderId: order.orderId}
    conn.then(conn => conn.createChannel()).then(channel => {
        channel.assertQueue(queue2, {durable: true}).then(() => channel.sendToQueue(queue2, Buffer.from(JSON.stringify(order)), {persistent: true}))
    })

    conn.then(conn => conn.createChannel()).then(channel =>{
        channel.assertQueue(queue3).then(() => channel.sendToQueue(queue3, Buffer.from(JSON.stringify(trans))))
    })
}

conn.then(conn => conn.createChannel()).then(channel => {
    channel.assertQueue(queue1).then(() => channel.consume(queue1, msg => {
        res = msg.content.toString()
        let order = JSON.parse(res)
        payment(order)
        channel.ack(msg)
    }, {noAck: false}))
})
