const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleware')
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))



app.use('/api/pedidos', require('./routes/pedidosRoutes'))
app.use('/api/users', require('./routes/usersRoutes'))
app.use('/api/products', require('./routes/productsRoutes'))

app.use(errorHandler)

app.listen(port, ()=> console.log(`Servidor iniciado en el puerto ${port}`))