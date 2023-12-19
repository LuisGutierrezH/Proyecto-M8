const asyncHandler = require('express-async-handler')
const Pedido = require('../model/pedidosModel')

const getPedidos = asyncHandler(async (req, res) => {
    const pedidos = await Pedido.find({user: req.user.id})

    res.status(200).json(pedidos)
})

const setPedidos= asyncHandler(async (req, res) => {
    if(!req.body.texto) {
        res.status(400)
        throw new Error("Por favor teclea una descripcion")

    }
    const pedido = await Pedido.create({
        texto: req.body.texto,
        user: req.user.id, 
        //Revisar esta línea, para ver si nos deja elegir producto
        products: req.body.products
    })
    res.status(201).json({ pedido })
})

const updatePedidos = asyncHandler(async (req, res) => {
    //verificamos que la tarea existe
    const pedido = await Pedido.findById(req.params.id)
    if(!pedido) {
        res.status(400)
        throw new Error('El pedido no fue encontrado')
    }
    //verificamos que la tarea pertenezca al usuario del token que la quiere modificar
     if (pedido.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error ('Acceso no autorizado')
     } else {
        const pedidoUpdated = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true})

    res.status(200).json(pedidoUpdated)
     }

    
})
const deletePedidos = asyncHandler(async (req, res) => {
     //verificamos que la tarea existe
    const pedido = await Pedido.findById(req.params.id)
    if(!pedido) {
        res.status(400)
        throw new Error('El pedido no fue encontrado')
    }
    //verificamos que la tarea pertenezca al usuario del token que la quiere modificar
     if (pedido.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error ('Acceso no autorizado')
    } else {
        await Pedido.deleteOne(pedido)
        //await Pedido.findByIdAndDelete(req.params.id)
    
    
        res.status(200).json({ id: req.params.id})

    }

})

module.exports = {
    getPedidos,
    setPedidos,
    updatePedidos,
    deletePedidos

}