module.exports = app => {
  const {getCartByUserId, addProduct, removeCart} = require('../controllers/cart')
  const r = require('express').Router()

  r.get('/:userId', getCartByUserId)
  r.post('/', addProduct)
  r.delete('/:userId', removeCart)
  app.use("/cart", r)
}
