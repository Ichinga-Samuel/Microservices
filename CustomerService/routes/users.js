const router = require('express').Router();
const customers = require('../models/customer');
const {amq} = require('../connection')

const conn = amq().catch(e => console.log(e))
const queue = 'createorder'

router.post('/create', async (req, res)=>{
  try{
    // assume req.body contain the all required fields properly validated
    await customers.create(req.body)
    res.status(201).json({message: 'message creation successful', status: true})
  }
  catch (e){
    res.status(400).json({status: true})
  }

})

router.post('/order', (req, res)=>{
  try{
    // assume req.body contain the all required fields properly validated
    // let order = {customerId, productId, amount} = req.body
    conn.then(conn => conn.createChannel()).then(channel => {
      channel.assertQueue(queue).then(() => channel.sendToQueue(queue, Buffer.from(JSON.stringify(req.body))))
    })
    res.status(200).json({status: true, message: "Order sent successfully"})
  }
  catch(e){
    console.log(e)
    res.status(400).json({status: false, message: "invalid request"})
  }
})

module.exports = router;
