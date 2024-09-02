module.exports = app => {
    const {getOrdersByUserId, checkout} = require('../controllers/order')
    const r = require('express').Router()

    r.get('/:userId', getOrdersByUserId)
    r.post('/', checkout)
    app.use("/order", r)
}