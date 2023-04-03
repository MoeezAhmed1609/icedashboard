import axios from 'axios'

// Constants Import
import {
  ALL_SALES_REQUEST,
  ALL_SALES_SUCCESS,
  ALL_SALES_FAIL,
  CREATE_SALES_REQUEST,
  CREATE_SALES_SUCCESS,
  CREATE_SALES_FAIL,
  UPDATE_SALES_REQUEST,
  UPDATE_SALES_SUCCESS,
  UPDATE_SALES_FAIL,
  UPDATE_RECEIPT_REQUEST,
  UPDATE_RECEIPT_SUCCESS,
  UPDATE_RECEIPT_FAIL,
  DELETE_RECEIPT_REQUEST,
  DELETE_RECEIPT_SUCCESS,
  DELETE_RECEIPT_FAIL,
  CLEAR_ALL_ERRORS,
} from '../constants/salesConstants'

// Get all Sales

export const getSales = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_SALES_REQUEST })
    const { data } = await axios.get('/api/v1/sales')
    dispatch({ type: ALL_SALES_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ALL_SALES_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Create Sales
export const createSales = (salesData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SALES_REQUEST })
    const config = {
      headers: { 'Content-Type': 'application/json' },
    }

    const { data } = await axios.post(
      '/api/v1/sales/receipt',
      salesData,
      config,
    )

    dispatch({ type: CREATE_SALES_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CREATE_SALES_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Update Sales
export const updateSales = (receiptUpdateData) => async (dispatch) => {
  dispatch({ type: UPDATE_SALES_REQUEST })

  const { data } = await axios({
    url: '/api/v1/sales/update',
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    data: {
      userId: receiptUpdateData.userId,
      receiptData: receiptUpdateData.receiptData,
    },
  })
    .then((r) => {
      console.log(r.data)
      dispatch({ type: UPDATE_SALES_SUCCESS, payload: r.data })
    })
    .catch((err) => {
      console.log(err.message)
      dispatch({
        type: UPDATE_SALES_FAIL,
        payload: err,
      })
    })
}

// Update Ledger receipt
export const updateSalesReceipt = (receiptUpdateData) => async (dispatch) => {
  dispatch({ type: DELETE_RECEIPT_REQUEST })
  const { data } = await axios({
    url: '/api/v1/sales/delete',
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    data: {
      userId: receiptUpdateData.userId,
      receiptId: receiptUpdateData.receiptId,
    },
  })
    .then((r) => {
      console.log(r.data)
      dispatch({ type: DELETE_RECEIPT_SUCCESS, payload: r.data })
    })
    .catch((err) => {
      console.log(err)
      dispatch({
        type: DELETE_RECEIPT_FAIL,
        payload: err,
      })
    })
}

// Delete sales receipt
export const deleteSalesReceipt = (receiptUpdateData) => async (dispatch) => {
  dispatch({ type: UPDATE_RECEIPT_REQUEST })
  const { data } = await axios({
    url: '/api/v1/sales/update/receipt',
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    data: {
      receiptId: receiptUpdateData.receiptId,
      isPaid: receiptUpdateData.isPaid,
      amountBalance: receiptUpdateData.amountBalance,
      amountPaid: receiptUpdateData.amountPaid,
    },
  })
    .then((r) => {
      console.log(r.data)
      dispatch({ type: UPDATE_RECEIPT_SUCCESS, payload: r.data })
    })
    .catch((err) => {
      console.log(err)
      dispatch({
        type: UPDATE_RECEIPT_FAIL,
        payload: err,
      })
    })
}

// Function to clear all errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ALL_ERRORS })
}
