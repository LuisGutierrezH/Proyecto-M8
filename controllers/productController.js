const asyncHandler = require('express-async-handler')
const Product = require('../model/productModel')
const userModel = require('../model/userModel')

const getProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({user: req.user.id})
    res.status(200).json(products)

})

const setProducts = asyncHandler(async(req, res) =>{
    const {product_name, description, price, sku} = req.body
    if(!product_name || !description || !price || !sku ) {
        res.status(400)
        throw new Error ('Faltan datos favor de agregar nombre, descripción y precio')

    }
    // verificar si ese producto ya existe 
    const product = await Product.create({
        product_name,
        description,
        price, 
        sku,
        user: req.user.id
       
    })
        res.status(201).json({product})
})

const updateProducts = asyncHandler(async(req, res) =>{
    //verificamos si el producto ya existe
    const product = await Product.findById(req.params.id)
    if(!product) {
        res.status(400)
        throw new Error('El producto no existe aún, por lo que no puede ser modificado')
    } else {
    const productUpdated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true})
    res.status(200).json(productUpdated)
    }
})

const deleteProducts = asyncHandler(async(req, res) => {
    //verificamos que el producto ya existe
    const product = await Product.findById(req.params.id)
    if(!product) {
        res.status(400)
        throw new Error('El producto no fué encontrado')
    } else {
        await Product.deleteOne(product)
        res.status(200).json({ id: req.params.id})
    }
})

module.exports = {
    getProducts,
    setProducts,
    updateProducts,
    deleteProducts
}