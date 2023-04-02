const express = require('express')
const cors = require('cors')
const path = require('path')
const errorMiddleware = require('./utils/error')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
// Routes Import

const sales = require('./routes/salesRoute')
const expenses = require('./routes/expensesRoute')

// Routes Implementation
app.use('/api/v1', sales)
app.use('/api/v1', expenses)

app.use(express.static(path.join(__dirname, '../frontend/build')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
})

app.use(errorMiddleware)

module.exports = app
