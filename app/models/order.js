module.exports = mongoose => {
  const schema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
      }
    ],
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now }
  })

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
  })
  
  return mongoose.model("Order", schema)
}

// module.exports = mongoose.model('Payment', paymentSchema)
