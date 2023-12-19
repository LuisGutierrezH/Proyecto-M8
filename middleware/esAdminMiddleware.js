const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
const Product = require('../model/productModel')

const adminEdit = asyncHandler(async(req, res, next) => {
    if(User.esAdmin = true) {
            console.log('Admin')
            next()
    } else {
            res.status(401)
            throw new Error ('Acceso no autorizado ')
        }
     
})

module.exports= {
    adminEdit
}
