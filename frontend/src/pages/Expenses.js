import React, { useState, useEffect } from 'react'

// CSS Import
import '../index.css'

// Redux Toolkit Import
import { useDispatch } from 'react-redux'

// Redux Actions Import
import { createExpense } from '../app/redux/actions/expenseActions'

// Material UI Components Import
import { Box, Grid, Typography, TextField, Button } from '@mui/material'

// Components Import
import MetaData from '../components/MetaData'
import ExpensesTable from '../components/ExpensesTable'

// dayJs Import

const Expenses = () => {
  const dispatch = useDispatch()

  // States define
  const [selectedDate, setSelectedDate] = useState('')
  const [description, setDescription] = useState('')
  const [paidAmount, setPaidAmount] = useState('')

  const handleExpenseSubmit = () => {
    const newExpense = {
      date: selectedDate,
      expense: {
        description: description,
        amountPaid: paidAmount,
      },
    }
    dispatch(createExpense(newExpense))
    window.location.reload()
  }

  return (
    <>
      <MetaData title="Ice Dashboard | Expenses" />
      <Box
        sx={{
          padding: '80px 0 80px 65px',
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            height: '74px',
            width: '88%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingRight: { xs: '10px', sm: '20px', md: '30px' },
            paddingTop: { xs: '10px', sm: '20px', md: '30px' },
            borderBottom: '2px solid #1976d2',
            textAlign: 'right',
          }}
        >
          <Typography variant="h5">نئے اخراجات شامل کریں۔</Typography>
        </Box>
        <Box
          sx={{
            height: '100%',
            width: { xs: '90%', sm: '76%', md: '74%' },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 5,
          }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sx={{
                minHeight: '340px',
                border: '2px solid #1976d2',
                marginTop: '20px',
                borderRadius: '20px',
                padding: '15px',
                paddingBottom: '0',
              }}
            >
              <Grid container sx={{ height: '100%', width: '100%' }}>
                <Grid item xs={12} sx={{ height: '60px', textAlign: 'right' }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      paddingRight: '15px',
                      borderBottom: '1.5px solid #1976d2',
                      width: '98%',
                    }}
                  >
                    اخراجات کی اشیاء
                  </Typography>
                </Grid>
                <Grid item sx={{ height: '220px', width: '100%' }} xs={12}>
                  <Box
                    sx={{
                      width: '100%',
                      padding: '10px 0',
                      textAlign: 'right',
                    }}
                  >
                    <Typography variant="subtitle2">
                      اخراجات کے ریکارڈ میں آئٹمز شامل کرنے کے لیے آئٹم کی
                      تفصیلات درج کریں۔
                    </Typography>
                    <Grid container sx={{ flexDirection: 'row-reverse' }}>
                      <Grid item xs={12} sm={4}>
                        <input
                          type="date"
                          className="datePicker"
                          onChange={(event) =>
                            setSelectedDate(event.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          id="outlined-error-helper-text"
                          label="تفصیل"
                          inputProps={{
                            min: 0,
                            style: { textAlign: 'right' },
                          }}
                          helperText="درکار*"
                          sx={{ width: '94%' }}
                          onChange={(event) =>
                            setDescription(event.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          id="outlined-error-helper-text"
                          label="ادا شدہ رقم"
                          inputProps={{
                            min: 0,
                            style: { textAlign: 'right' },
                          }}
                          helperText="درکار*"
                          sx={{ width: '94%' }}
                          onChange={(event) =>
                            setPaidAmount(Number(event.target.value))
                          }
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          height: '100px',
                          alignItems: 'center',
                        }}
                      >
                        <Button
                          variant="contained"
                          sx={{ width: '330px' }}
                          disabled={
                            !selectedDate || !paidAmount || !description
                          }
                          onClick={handleExpenseSubmit}
                        >
                          اخراجات شامل کریں۔
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                minHeight: '400px',
                border: '2px solid #1976d2',
                marginTop: '30px',
                borderRadius: '20px',
                padding: '24px',
                paddingBottom: '0',
              }}
            >
              <Grid container sx={{ height: '100%', width: '100%' }}>
                <Grid item xs={12} sx={{ height: '60px', textAlign: 'right' }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      paddingRight: '15px',
                      borderBottom: '1.5px solid #1976d2',
                      width: '98%',
                    }}
                  >
                    تمام اخراجات
                  </Typography>
                </Grid>
                <Grid sx={{ height: '430px', width: '100%' }} item xs={12}>
                  <ExpensesTable />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default Expenses
