module.exports=mongoose =>{

const schema = new mongoose.Schema({
    userId: {type :String, require: true},
    products: [{
    productId :{type :mongoose.Schema.Types.ObjectId, ref: 'Product', require: true },
    quantity :{type :Number, require: true}
}]
},
{
    timestamps: true
})
schema.method("toJSON", function(){
    const {__v,_id,...object} = this.toObject()
    object.id= _id
    return object
})
return mongoose.model("Cart", schema)

}

// module.exports = mongoose.model('cart', cartSchema)