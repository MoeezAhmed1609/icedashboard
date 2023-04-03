import { createReducer } from '@reduxjs/toolkit'

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

const initialState = {
  sales: [],
}

export const salesReducer = createReducer(initialState, (builder) => {
  builder.addCase(ALL_SALES_REQUEST, (state, action) => {
    return {
      loading: true,
      salesData: [],
    }
  })
  builder.addCase(ALL_SALES_SUCCESS, (state, action) => {
    return {
      loading: false,
      salesData: action.payload,
    }
  })
  builder.addCase(ALL_SALES_FAIL, (state, action) => {
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

export const createSalesReducer = createReducer(initialState, (builder) => {
  builder.addCase(CREATE_SALES_REQUEST, (state, action) => {
    return {
      loading: true,
      ...state,
    }
  })
  builder.addCase(CREATE_SALES_SUCCESS, (state, action) => {
    return {
      loading: false,
      success: action.payload.success,
      salesData: action.payload.sales,
    }
  })
  builder.addCase(CREATE_SALES_FAIL, (state, action) => {
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

export const updateSalesReducer = createReducer(initialState, (builder) => {
  builder.addCase(UPDATE_SALES_REQUEST, (state, action) => {
    return {
      loading: true,
      ...state,
    }
  })
  builder.addCase(UPDATE_SALES_SUCCESS, (state, action) => {
    return {
      loading: false,
      success: action.payload.success,
      salesData: action.payload.sales,
    }
  })
  builder.addCase(UPDATE_SALES_FAIL, (state, action) => {
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

export const updateSalesReceiptReducer = createReducer(
  initialState,
  (builder) => {
    builder.addCase(UPDATE_RECEIPT_REQUEST, (state, action) => {
      return {
        loading: true,
        ...state,
      }
    })
    builder.addCase(UPDATE_RECEIPT_SUCCESS, (state, action) => {
      return {
        loading: false,
        success: action.payload.success,
        salesData: action.payload.sales,
      }
    })
    builder.addCase(UPDATE_RECEIPT_FAIL, (state, action) => {
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
  },
)

export const deleteSalesReceiptReducer = createReducer(
  initialState,
  (builder) => {
    builder.addCase(DELETE_RECEIPT_REQUEST, (state, action) => {
      return {
        loading: true,
        ...state,
      }
    })
    builder.addCase(DELETE_RECEIPT_SUCCESS, (state, action) => {
      return {
        loading: false,
        success: action.payload.success,
        salesData: action.payload.sales,
      }
    })
    builder.addCase(DELETE_RECEIPT_FAIL, (state, action) => {
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
  },
)
