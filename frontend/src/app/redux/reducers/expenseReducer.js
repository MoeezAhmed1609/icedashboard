import { createReducer } from '@reduxjs/toolkit'

// Constants Import
import {
  ALL_EXPENSE_REQUEST,
  ALL_EXPENSE_SUCCESS,
  ALL_EXPENSE_FAIL,
  CREATE_EXPENSE_REQUEST,
  CREATE_EXPENSE_SUCCESS,
  CREATE_EXPENSE_FAIL,
  CLEAR_ALL_ERRORS,
} from '../constants/expenseConstants'

const initialState = {
  expenses: [],
}

export const expenseReducer = createReducer(initialState, (builder) => {
  builder.addCase(ALL_EXPENSE_REQUEST, (state, action) => {
    return {
      loading: true,
      expensesData: [],
    }
  })
  builder.addCase(ALL_EXPENSE_SUCCESS, (state, action) => {
    return {
      loading: false,
      expensesData: action.payload,
    }
  })
  builder.addCase(ALL_EXPENSE_FAIL, (state, action) => {
    return {
      loading: false,
      error: action.payload,
    }
  })
  builder.addCase(CLEAR_ALL_ERRORS, (state, action) => {
    return {
      ...state,
      error: null,
    }
  })
})

export const createExpenseReducer = createReducer(initialState, (builder) => {
  builder.addCase(CREATE_EXPENSE_REQUEST, (state, action) => {
    return {
      loading: true,
      ...state,
    }
  })
  builder.addCase(CREATE_EXPENSE_SUCCESS, (state, action) => {
    return {
      loading: false,
      success: action.payload.success,
      expensesData: action.payload.expense,
    }
  })
  builder.addCase(CREATE_EXPENSE_FAIL, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.payload,
    }
  })
  builder.addCase(CLEAR_ALL_ERRORS, (state, action) => {
    return {
      ...state,
      error: null,
    }
  })
})
