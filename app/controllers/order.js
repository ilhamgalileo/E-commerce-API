const db = require('../models')
const Order = db.order
const Cart = db.cart
const Product = db.product

exports.checkout = async (req, res) => {
    const { userId } = req.body

    try {
        // Cari keranjang pengguna
        const cart = await Cart.findOne({ userId }).populate('products.productId', 'name price stock')
        if (!cart || cart.products.length === 0) {
            return res.status(404).send({ message: 'Cart is empty or not found' })
        }

        const products = cart.products.map(p => ({
            productId: p.productId._id,
            name: p.productId.name,
            quantity: p.quantity,
            price: p.productId.price
        }))
        
        const totalAmount = products.reduce((total, p) => total + p.price * p.quantity, 0)

        // Buat pesanan baru
        const order = new Order({
            userId,
            products,
            totalAmount
        })
        
        await order.save()

        // Kurangi stok produk setelah pesanan dibuat
        for (const p of cart.products) {
            const product = await Product.findById(p.productId._id)
            product.stock -= p.quantity

            // Validasi stok tidak boleh negatif
            if (product.stock < 0) {
                return res.status(400).send({ message: ` stok ${product.name} tidak mencukupi` })
            }
            
            await product.save()
        }

        // Hapus data keranjang setelah checkout berhasil
        await Cart.findByIdAndDelete(cart._id)

        res.status(201).send({ message: 'Checkout successful', order })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

exports.getOrdersByUserId = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId })
        res.send(orders)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}


