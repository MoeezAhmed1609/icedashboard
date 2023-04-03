import React from 'react'

// Redux Toolkit Import
import { store } from './app/store'
import { Provider } from 'react-redux'

// React Router DOM Import
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Pages Import
import Dashboard from './pages/Dashboard'
import Reminder from './pages/Reminder'
import Receipt from './pages/Receipt'
import Ledger from './pages/Ledger'
import Expenses from './pages/Expenses'
import Sales from './pages/Sales'

// Components Import
import Header from './components/Header'

// Material UI Components Import
import { CssBaseline } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Provider store={store}>
        <Router>
          <CssBaseline />
          <Header />
          <Routes>
            <Route element={<Dashboard />} path="/" />
            <Route element={<Dashboard />} path="/dashboard" />
            <Route element={<Sales />} path="/sales" />
            <Route element={<Expenses />} path="/expenses" />
            <Route element={<Ledger />} path="/ledger" />
            <Route element={<Receipt />} path="/receipt" />
            <Route element={<Reminder />} path="/reminders" />
          </Routes>
        </Router>
      </Provider>
    </LocalizationProvider>
  )
}

export default App
