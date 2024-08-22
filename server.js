const express = require('express')
const cors = require('cors')
const db = require('./app/models')

const app = express()

// Gunakan opsi CORS dengan origin wildcard
app.use(cors({ origin: '*' }))
app.use(express.json())

// Koneksi ke database dengan log yang lebih terstruktur
db.mongoose.connect(db.url)
    .then(() => console.log('Database connected successfully'))
    .catch(err => {
        console.error('Database connection failed:', err)
        process.exit(1)
    })

// Penggunaan require tanpa koma di akhir
require('./app/routes/product')(app)
require('./app/routes/cart')(app)
require('./app/routes/order')(app)

// Mengatur port dan memulai server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`))
