import { configureStore } from '@reduxjs/toolkit'

// Reducers Import
import {
  expenseReducer,
  createExpenseReducer,
} from './redux/reducers/expenseReducer'
import {
  salesReducer,
  createSalesReducer,
  updateSalesReducer,
  updateSalesReceiptReducer,
  deleteSalesReceiptReducer,
} from './redux/reducers/salesReducer'

export const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    createExpense: createExpenseReducer,
    sales: salesReducer,
    createSales: createSalesReducer,
    updateSales: updateSalesReducer,
    updateSalesReceipt: updateSalesReceiptReducer,
    deleteSalesReceipt: deleteSalesReceiptReducer,
  },
})
