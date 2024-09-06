const jwt = require('jsonwebtoken')
module.exports = app => {
  const authenticate = require('../middleware/middleware')
  const cart = require('../controllers/cart')
  const r = require('express').Router()

  r.get('/', authenticate, cart.getCart)
  r.post('/add', authenticate, cart.addProduct)
  r.delete('/delete/:cartId', authenticate, cart.removeCart)
  app.use("/cart", r)
}
