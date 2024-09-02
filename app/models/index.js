require('dotenv').config() // Memuat variabel lingkungan dari file .env
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = process.env.MONGO_URI // Menggunakan URL MongoDB dari variabel lingkungan

// Fungsi untuk menghubungkan ke MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('MongoDB connected successfully')
    } catch (error) {
        console.error('MongoDB connection error:', error)
        process.exit(1)
    }
}

// Inisialisasi model-model
db.user = require('./user')(mongoose)
db.product = require('./product')(mongoose)
db.cart = require('./cart')(mongoose)
db.order = require('./order')(mongoose)

module.exports = { db, connectDB }