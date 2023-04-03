import axios from 'axios'

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

// Get all expenses

export const getExpenses = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_EXPENSE_REQUEST })
    const { data } = await axios.get('/api/v1/expenses')
    dispatch({ type: ALL_EXPENSE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ALL_EXPENSE_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Create expenses
export const createExpense = (expenseData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_EXPENSE_REQUEST })
    const config = {
      headers: { 'Content-Type': 'application/json' },
    }

    const { data } = await axios.post(
      '/api/v1/expenses/create',
      expenseData,
      config,
    )

    dispatch({ type: CREATE_EXPENSE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CREATE_EXPENSE_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Function to clear all errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ALL_ERRORS })
}
