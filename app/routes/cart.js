module.exports = app =>{
  const cart = require('../controllers/cart')
  const r = require ('express').Router()
  
  r.get('/:userId', cart.getCartByUserId)
  r.post('/', cart.addProduct)
  r.delete('/:userId', cart.removeCart)
  app.use("/cart",r)
  }
  