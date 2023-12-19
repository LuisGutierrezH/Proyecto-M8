const express = require('express')
const router = express.Router()
const { getPedidos, setPedidos, updatePedidos, deletePedidos } = require('../controllers/pedidosController')
const { protect } = require('../middleware/authMiddleware')

//router.route('/').get(getPedidos).post(setPedidos)
router.get('/', protect, getPedidos)
router.post('/', protect, setPedidos)
router.route('/:id').put(protect, updatePedidos).delete(protect, deletePedidos)
//router.put('/:id', updatePedidos)
//router.delete('/:id', deletePedidos)

module.exports = router