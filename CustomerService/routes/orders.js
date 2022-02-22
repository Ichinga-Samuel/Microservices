const router = require('express').Router();

const {amq} = require('../connection');
const customers = require('../models/customer');

const conn = amq().catch(e => console.error(e));
const queue = 'createorder';


router.post('/order', (req, res)=>{
  try{
    // assume req.body contains the all required fields properly validated
    conn.then(conn => conn.createChannel()).then(channel => {
      channel.assertQueue(queue).then(() => channel.sendToQueue(queue, Buffer.from(JSON.stringify(req.body))))
    })
    res.status(200).json({status: true, message: "Order sent successfully"})
  }
  catch(e){
    console.error(e)
    res.status(400).json({status: false, message: "Invalid Request"})
  }
})

module.exports = router;
