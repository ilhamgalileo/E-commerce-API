module.exports = app => {
    const order = require('../controllers/order')
    const r = require('express').Router()
    // GET all payments for a specific user by user ID
    r.get('/:userId', order.getOrdersByUserId)

    // POST create a new payment
    r.post('/', order.checkout)
    app.use("/order", r)
}