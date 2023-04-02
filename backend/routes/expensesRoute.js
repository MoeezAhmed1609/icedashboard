const express = require('express')

// Controllers Import
const {
  getAllExpenses,
  createExpenseRecord,
} = require('../controllers/expenseController')

const router = express.Router()

// Routes
router.get('/expenses', getAllExpenses)
router.post('/expenses/create', createExpenseRecord)

module.exports = router
