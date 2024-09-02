const bcrypt = require('bcrypt')

module.exports = mongoose => {
  const schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Menambahkan unique untuk email
    password: { type: String, required: true }  // Mengganti 'require' dengan 'required'
  })

  // Middleware untuk hashing password sebelum menyimpan user
  schema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        next(error)
    }
})


  // Metode untuk mengubah representasi JSON dari dokumen
  schema.method("toJSON", function () {
    const { __v, _id, password, ...object } = this.toObject()
    object.id = _id
    return object
  })

  return mongoose.model("User", schema)
}
