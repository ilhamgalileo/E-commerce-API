const db = require('../models') // Mengimpor model dari direktori '../models'
const Cart = db.cart;
const Product = db.product

exports.getCartByUserId = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('products.productId')
    if (!cart) {
      res.status(404).send({ message: 'Cart not found' })
    } else {
      res.send(cart)
    }
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

exports.addProduct = async (req, res) => {
  const { userId, sku, quantity } = req.body
  try {
    // Cari produk berdasarkan SKU
    const product = await Product.findOne({ sku })
    if (!product) {
      return res.status(404).send({ message: 'Produk tidak tersedia' })
    }

    // Periksa apakah jumlah yang diminta melebihi stok yang tersedia
    if (quantity > product.stock) {
      return res.status(400).send({ message: 'Jumlah produk melebihi stok yang tersedia' })
    }

    // Cari keranjang berdasarkan userId
    let cart = await Cart.findOne({ userId })

    if (!cart) {
      // Jika keranjang tidak ada, buat keranjang baru
      cart = new Cart({
        userId,
        products: [{ productId: product._id, quantity }]
      })
    } else {
      // Jika keranjang ada, cek apakah produk sudah ada di keranjang
      const productIndex = cart.products.findIndex(p => p.productId.toString() === product._id.toString())

      if (productIndex > -1) {
        // Jika produk sudah ada, tambahkan jumlahnya
        const newQuantity = cart.products[productIndex].quantity + quantity

        // Periksa apakah total jumlah melebihi stok yang tersedia
        if (newQuantity > product.stock) {
          return res.status(400).send({ message: 'Jumlah total produk melebihi stok yang tersedia' })
        }

        cart.products[productIndex].quantity = newQuantity
      } else {
        // Jika produk belum ada, tambahkan ke keranjang
        cart.products.push({ productId: product._id, quantity })
      }
    }

    // Simpan keranjang
    await cart.save()
    res.status(201).send(cart)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

exports.removeCart = async (req, res) => {
  const { userId } = req.params

  try {
    const cart = await Cart.findOneAndDelete({ userId })

    if (!cart) {
      return res.status(404).send({ message: 'Keranjang tidak ditemukan' })
    }

    res.send({ message: 'Keranjang dan semua produk di dalamnya telah dihapus', cart })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}
