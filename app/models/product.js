module.exports = mongoose => {
    const schema = new mongoose.Schema({
        sku: {type: String, require: true},
        name: { type: String, require: true },
        price: { type: String, require: true },
        description: String,
        stock: { type: Number, require: true }
    },
        {
            timestamps: true
        })
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject()
        object.id = _id
        return object
    })

    return mongoose.model("Product", schema)
}
