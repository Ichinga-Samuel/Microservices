const router = require('express').Router();
const {amq} = require('../connection');
const customers = require('../models/customer')

const conn = amq().catch(e => console.error(e));

const queue1 = 'products';
const queue4 = 'transactioncomplete';
const queue5 = 'getproducts';

// get the latest complete transaction
let transaction;
  conn.then(conn => conn.createChannel()).then(channel => {
  channel.assertQueue(queue4).then(()=> channel.consume(queue4, msg => {
      transaction = JSON.parse(msg.content.toString())
      channel.ack(msg)
    }, {noAck: false})
  )
})

// get products from the product service
conn.then(con => con.createChannel()).then(ch => {
  ch.assertQueue(queue5).then(() => ch.sendToQueue(queue5, Buffer.from('get')))
})
let products = [];
conn.then(conn => conn.createChannel()).then(channel => {
  channel.assertQueue(queue1, {durable: true}).then(()=> channel.consume(queue1, msg => {
      products = JSON.parse(msg.content.toString());
      console.log(products)
      channel.ack(msg)
    }, {noAck: false})
  )
})

router.get('/', async function(req, res, next) {
  res.locals.products = products
  if(transaction){
    let cid = await customers.findOne({customerId: transaction.customerId}).select('name')
    res.locals.alert = `Transaction By ${cid.name} Completed`
  }
  let cus = await customers.find({})
  res.render('index', { title: 'YouVerify Store', customers: cus});
});

module.exports = router;
