const mongoose = require ('mongoose')

const pedidoSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'

    },
    texto: {
        type: String,
        required: [true, 'Por favor teclea una descripción del pedido']
    },
    products: {
       type: Array,
       required: true
    },
    completada: {
        type: Boolean,
        default: false
    }
},  {
    timestamps: true
})
module.exports= mongoose.model('Pedido', pedidoSchema)