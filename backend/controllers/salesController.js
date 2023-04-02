// Models Import
const Sales = require('../models/salesModel')
const catchAsyncErrors = require('../utils/catchAsyncErrors')

// Get all sales
exports.getAllSales = catchAsyncErrors(async (req, res) => {
  const sales = await Sales.find()
  res.status(200).json({
    success: true,
    sales,
  })
})

// Create new sales record
exports.createSaleRecord = catchAsyncErrors(async (req, res, next) => {
  const sale = await Sales.create(req.body)

  res.status(200).json({
    success: true,
    sale,
  })
})

// Update Sale Record
exports.updateSaleRecord = catchAsyncErrors(async (req, res, next) => {
  const sales = await Sales.findByIdAndUpdate(
    req.body.userId,
    {
      $push: { receipts: req.body.receiptData },
      totalUnpaidReceipts: req.body.totalUnpaidReceipts,
    },
    { new: true, runValidators: true, useFindAndModify: false },
  )
  res.status(200).json({
    success: true,
    sales,
  })
})

// update unpaid sales record
exports.updateUnpaidSalesRecord = catchAsyncErrors(async (req, res, next) => {
  const sale = await Sales.updateOne(
    { 'receipts._id': req.body.receiptId },
    {
      $set: {
        'receipts.$.isPaid': req.body.isPaid,
        'receipts.$.amountBalance': req.body.amountBalance,
        'receipts.$.amountPaid': req.body.amountPaid,
      },
    },
  )
  res.status(200).json({
    success: true,
    sale,
  })
})

// delete sales record
exports.deleteSalesRecord = catchAsyncErrors(async (req, res, next) => {
  const sale = await Sales.updateOne(
    { _id: req.body.userId },
    { $pull: { receipts: { _id: req.body.receiptId } } },
  )
  res.status(200).json({
    success: true,
    sale,
  })
})
