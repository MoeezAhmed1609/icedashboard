const express = require('express')

// Controllers Import
const {
  getAllSales,
  createSaleRecord,
  updateSaleRecord,
  updateUnpaidSalesRecord,
  deleteSalesRecord,
} = require('../controllers/salesController')

const router = express.Router()

// Routes
router.get('/sales', getAllSales)
router.post('/sales/receipt', createSaleRecord)
router.put('/sales/update', updateSaleRecord)
router.put('/sales/update/receipt', updateUnpaidSalesRecord)
router.delete('/sales/delete', deleteSalesRecord)

module.exports = router
