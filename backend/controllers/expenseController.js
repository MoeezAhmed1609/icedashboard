// Models Import
const Expenses = require('../models/expenseModel')
const catchAsyncErrors = require('../utils/catchAsyncErrors')

// Get all sales
exports.getAllExpenses = catchAsyncErrors(async (req, res) => {
  const expenses = await Expenses.find()

  res.status(200).json({
    success: true,
    expenses,
  })
})

// Create new expense record
exports.createExpenseRecord = catchAsyncErrors(async (req, res, next) => {
  const expense = await Expenses.create(req.body)

  res.status(200).json({
    success: true,
    expense,
  })
})
