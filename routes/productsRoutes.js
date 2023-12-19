const express = require('express')
const router = express.Router()
const { getProducts, setProducts, updateProducts, deleteProducts} = require('../controllers/productController')
const { protect } = require('../middleware/authMiddleware')
const {adminEdit} = require('../middleware/esAdminMiddleware')


router.get('/', protect, adminEdit, getProducts)
router.post('/', protect, adminEdit, setProducts)
router.put('/:id', protect, adminEdit, updateProducts)
router.delete('/:id', protect, adminEdit, deleteProducts)

module.exports=router