const express = require('express')
const router =  express.Router()
const {registerUser, loginUser, dataUser} = require('../controllers/usersController')
const { protect } = require('../middleware/authMiddleware')

//publico
router.post('/', registerUser )
router.post('/login', loginUser )

//privado
router.get('/data', protect, dataUser )


module.exports= router