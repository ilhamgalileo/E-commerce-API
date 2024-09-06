module.exports = app => {
    const authenticate = require('../middleware/middleware')
    const { getOrdersByUserId, checkout } = require('../controllers/order')
    const r = require('express').Router()

    r.post('/:cartId', authenticate, checkout)
    app.use("/order", r)
}