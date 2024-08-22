const dbConfig = require("../config/database")
const mongoose = require('mongoose')
module.exports = {
    mongoose,
    url: dbConfig.url,
    product: require('./product')(mongoose),
    cart: require('./cart')(mongoose),
    order: require('./order')(mongoose)
}