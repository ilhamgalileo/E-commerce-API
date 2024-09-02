const express = require('express')
const cors = require('cors')
const { connectDB } = require('./app/models/index')
require('dotenv').config() // Memuat variabel lingkungan dari file .env

const app = express()

// Gunakan opsi CORS dengan origin wildcard
app.use(cors({ origin: '*' }))
app.use(express.json())

// Koneksi ke database dengan log yang lebih terstruktur
connectDB()
    .then(() => console.log('Database connected successfully'))
    .catch(err => {
        console.error('Database connection failed:', err)
        process.exit(1)
    })

// Penggunaan require tanpa koma di akhir
require('./app/routes/product')(app)
require('./app/routes/cart')(app)
require('./app/routes/order')(app)
require('./app/routes/user')(app)

app.use((req,res,next)=>{
    res.status(404).json({message: `${req.method} ${req.originalUrl} not found`})
})

// Mengatur port dan memulai server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`))