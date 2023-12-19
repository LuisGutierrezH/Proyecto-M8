const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler =  require('express-async-handler')
const User =  require('../model/userModel')

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password, esAdmin} = req.body
    if (!name || !email || !password){
        res.status(400)
        throw new Error ('Faltan datos favor de verificar')
    }

    // verificar si ese usuario ya existe 
    const userExiste = await User.findOne({email})
    if (userExiste) {
        res.status(400)
        throw new Error ('Ese usuario ya existe en la base de datos, favor de verificarlo')
    }
    //hash al password 
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    //crear el nuevo usuario
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        esAdmin
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            admin: user.esAdmin
        })
    } else {
        res.status(400)
        throw new Error("No se pudieron guardar los datos")
    }

})
const loginUser = asyncHandler(async (req, res) => {

    //desestructuramos el body
    const {email, password} = req.body

    // verificamos que exista el usuario
    const user = await User.findOne({email})
    
    //verificamos al usuario y la contraseña
    if (user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id,
            name: user.name, 
            email: user.email,
            token: generarToken(user.id),
            esAdmin: user.esAdmin
        })

    } else {
        res.status(400)
        throw new Error ('Credenciales incorrectas')
    }
  
})
const dataUser = asyncHandler(async (req, res) => {
    res.status(201).json(req.user)
})

//Función para generar un JWT
const generarToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })

    
    }
module.exports = {
    registerUser,
    loginUser,
    dataUser
}