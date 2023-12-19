const mongoose = require('mongoose')

const productSchema = mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }, 
    product_name: {
        type: String,
        required: true,
        unique: true

    },
    description: {
        type: String,
        required: [true, 'Por favor teclea una descripción del producto']
    },
    price: {
        type: Number,
        required: true
    },
    sku: {
        type: String,
        required: true
    }
},{
    timestamps: true

}) 

module.exports = mongoose.model('Product', productSchema)