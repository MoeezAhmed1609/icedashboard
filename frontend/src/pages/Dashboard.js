import React, { useEffect, useState, useRef } from 'react'

// Redux Toolkit Import
import { useDispatch, useSelector } from 'react-redux'

// Redux Actions Import
import { getSales } from '../app/redux/actions/salesActions'
import { getExpenses } from '../app/redux/actions/expenseActions'

// Material UI Components Import
import {
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material'

// Components Import
import MetaData from '../components/MetaData'

// Import React To Print
import { useReactToPrint } from 'react-to-print'

const Dashboard = () => {
  const dispatch = useDispatch()

  // Total Sales Calculation

  const getMonthName = () => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    const d = new Date()
    return monthNames[d.getMonth()]
  }
  const getCurrentYear = () => {
    const d = new Date()
    return d.getFullYear()
  }

  const currentMonth = getMonthName()
  const currentYear = getCurrentYear()

  const [month, setMonth] = useState(currentMonth)
  const [year, setYear] = useState(currentYear)
  const [customer, setCustomer] = useState('')
  const [mode, setMode] = useState('')

  const handleMonthChange = (event) => {
    setMonth(event.target.value)
  }
  const handleYearChange = (event) => {
    setYear(event.target.value)
  }
  const handleCustomerChange = (event) => {
    setCustomer(event.target.value)
  }

  // Getting sales from redux state
  const { salesData } = useSelector((state) => state.sales)
  const { expensesData } = useSelector((state) => state.expenses)

  // React States
  const sales = []
  let monthTotal = 0
  let monthTotalUnits = 0
  let monthTotalExpense = 0
  let yearTotalExpense = 0
  const expenses = []
  const customers = []
  const customerData = []

  // monthly
  let monthlyData = []
  let monthlySaleTotal = 0
  let monthlySaleUnits = 0
  let monthlySalePaidAmount = 0
  let monthlySaleBalanceAmount = 0
  let monthlyProfitLoss

  // yearly
  let yearlyData = []
  let yearlySaleTotal = 0
  let yearlySaleUnits = 0
  let yearlySalePaidAmount = 0
  let yearlySaleBalanceAmount = 0

  salesData?.sales?.map((sale) => {
    let receipts = []
    let monthlySales = []
    let yearlySales = []
    customers.push(sale?.customer?.name)
    sale?.receipts.map((receipt) => {
      if (receipt.isPaid === true && receipt.month === month) {
        receipts.push(receipt)
        receipt?.items?.map((item) => {
          monthTotal += item?.lineTotal
          monthTotalUnits += item?.quantity
        })
      }
      if (receipt.month === month) {
        monthlySales.push(receipt)
        receipt?.items?.map((item) => {
          monthlySaleTotal += item?.lineTotal
          monthlySaleUnits += item?.quantity
        })
        monthlySalePaidAmount += receipt?.amountPaid
        monthlySaleBalanceAmount += receipt?.amountBalance
      }
      if (receipt.year === year) {
        yearlySales.push(receipt)
        receipt?.items?.map((item) => {
          yearlySaleTotal += item?.lineTotal
          yearlySaleUnits += item?.quantity
        })
        yearlySalePaidAmount += receipt?.amountPaid
        yearlySaleBalanceAmount += receipt?.amountBalance
      }
    })
    sales.push({
      customer: sale?.customer,
      receipts,
    })
    let monthlyCustomerTotal = 0
    let monthlyCustomerPaidAmount = 0
    let monthlyCustomerBalanceAmount = 0
    let yearlyCustomerTotal = 0
    let yearlyCustomerPaidAmount = 0
    let yearlyCustomerBalanceAmount = 0
    monthlySales.map((sale) => {
      sale?.items.map((item) => {
        monthlyCustomerTotal += item?.lineTotal
      })
      monthlyCustomerPaidAmount += sale?.amountPaid
      monthlyCustomerBalanceAmount += sale?.amountBalance
    })
    yearlySales.map((sale) => {
      sale?.items.map((item) => {
        yearlyCustomerTotal += item?.lineTotal
      })
      yearlyCustomerPaidAmount += sale?.amountPaid
      yearlyCustomerBalanceAmount += sale?.amountBalance
    })
    monthlyData.push({
      customer: sale?.customer?.name,
      monthlyCustomerTotal,
      monthlyCustomerPaidAmount,
      monthlyCustomerBalanceAmount,
    })
    yearlyData.push({
      customer: sale?.customer?.name,
      yearlyCustomerTotal,
      yearlyCustomerPaidAmount,
      yearlyCustomerBalanceAmount,
    })
  })

  expensesData?.expenses?.filter((exp) => {
    if (exp.expense.month === month) {
      monthTotalExpense += exp?.expense?.amountPaid
      expenses.unshift(exp)
    }
    if (exp.expense.year === year) {
      yearTotalExpense += exp?.expense?.amountPaid
      // expenses.unshift(exp)
    }
  })
  console.log(expensesData)

  // Customer Report
  let amountPaid = 0
  let amountBalance = 0
  salesData?.sales?.filter((sale) => {
    if (sale?.customer?.name === customer) {
      sale?.receipts.filter((receipt) => {
        if (receipt?.month === month) {
          amountPaid += receipt?.amountPaid
          amountBalance += receipt?.amountBalance

          receipt?.items.filter((item) => {
            let data = {
              date: receipt?.date,
              customer: sale?.customer,
              status: receipt?.isPaid,
              item: item,
              id: sale?.id,
              receipt: receipt._id,
            }
            customerData.unshift(data)
          })
        }
      })
    }
  })
  let total = 0
  customerData?.filter((data) => {
    total += data?.item?.lineTotal
  })
  const handleCustomerReport = () => {
    setMode('customer')
  }
  const handleMonthlyReport = () => {
    setMode('monthly')
  }

  // making sales data
  let receipts = []
  sales?.filter((sale) => {
    sale?.receipts?.filter((receipt) => {
      receipt?.items?.map((item) => {
        let data = {
          date: receipt?.date,
          customer: sale?.customer,
          status: receipt?.isPaid,
          item: item,
        }
        receipts.unshift(data)
      })
    })
  })

  // Print Summary

  const print = useRef()

  const generatePrint = useReactToPrint({
    content: () => print.current,
    documentTitle: `${month}sheet`,
    onAfterPrint: () => alert('Summary Printed Successfully!'),
  })

  useEffect(() => {
    dispatch(getSales())
    dispatch(getExpenses())
  }, [dispatch])
  return (
    <>
      <MetaData title="Ice Dashboard" />
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
            alignItems: 'center',
            justifyContent: 'flex-end',

            paddingRight: { xs: '10px', sm: '20px', md: '30px' },
            paddingTop: { xs: '10px', sm: '20px', md: '30px' },
            borderBottom: '2px solid #1976d2',
          }}
        >
          <Typography variant="h5">ڈیش بورڈ</Typography>
        </Box>
        <Box sx={{ width: '100%', marginTop: '20px', padding: '0 6%' }}>
          <Grid
            container
            sx={{
              minHeight: '240px',
              padding: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Grid
              item
              xs={12}
              sm={4}
              md={4}
              sx={{ margin: { xs: '14px', sm: '0' } }}
            >
              <Box
                sx={{
                  height: '200px',
                  width: '90%',
                  background: '#1e8dfe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="h6" sx={{ color: 'white' }} gutterBottom>
                  ({month}) کل اخراجات
                </Typography>
                <Typography variant="h3" sx={{ color: 'white' }}>
                  {monthTotalExpense}
                  <span
                    style={{
                      color: 'white',
                      fontSize: '26px',
                      paddingLeft: '10px',
                    }}
                  >
                    RS
                  </span>
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              md={4}
              sx={{ margin: { xs: '14px', sm: '0' } }}
            >
              <Box
                sx={{
                  height: '200px',
                  width: '90%',
                  background: '#1e8dfe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="h6" sx={{ color: 'white' }} gutterBottom>
                  ({month}) کل یونٹس کی فروخت
                </Typography>
                <Typography variant="h3" sx={{ color: 'white' }}>
                  <span
                    style={{
                      color: 'white',
                      fontSize: '26px',
                      paddingLeft: '10px',
                    }}
                  >
                    یونٹس
                  </span>
                  {monthTotalUnits}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              md={4}
              sx={{ margin: { xs: '14px', sm: '0' } }}
            >
              <Box
                sx={{
                  height: '200px',
                  width: '90%',
                  background: '#1e8dfe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="h6" sx={{ color: 'white' }} gutterBottom>
                  کل فروخت ({month})
                </Typography>
                <Typography variant="h3" sx={{ color: 'white' }}>
                  {monthTotal}
                  <span
                    style={{
                      color: 'white',
                      fontSize: '26px',
                      paddingLeft: '10px',
                    }}
                  >
                    RS
                  </span>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            marginTop: '30px',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Print Summaries
          </Typography>
        </Box>
        <Box sx={{ width: '100%', height: '350px', padding: '3%' }}>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  height: '300px',
                  borderRight: '2px solid #1976d2',
                  padding: '5%',
                  textAlign: 'right',
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ paddingRight: '15px' }}
                >
                  سالانہ رپورٹ پرنٹ کریں۔
                </Typography>
                <FormControl fullWidth sx={{ marginTop: '20px' }}>
                  <InputLabel id="demo-simple-select-label">
                    سال منتخب کریں
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={year}
                    label="Select Month"
                    onChange={handleYearChange}
                  >
                    <MenuItem value={'2021'}>2021</MenuItem>
                    <MenuItem value={'2022'}>2022</MenuItem>
                    <MenuItem value={'2023'}>2023</MenuItem>
                    <MenuItem value={'2024'}>2024</MenuItem>
                    <MenuItem value={'2025'}>2025</MenuItem>
                  </Select>
                </FormControl>
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    height: '50px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '15px',
                    padding: '2%',
                  }}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => setMode('yearly')}
                  >
                    حاصل کریں
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  height: '300px',
                  borderRight: '2px solid #1976d2',
                  padding: '5%',
                  textAlign: 'right',
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ paddingRight: '15px' }}
                >
                  ماہانہ رپورٹ پرنٹ کریں۔
                </Typography>
                <FormControl fullWidth sx={{ marginTop: '20px' }}>
                  <InputLabel id="demo-simple-select-label">
                    مہینہ منتخب کریں
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={month}
                    label="Select Month"
                    onChange={handleMonthChange}
                  >
                    <MenuItem value={'January'}>January</MenuItem>
                    <MenuItem value={'February'}>February</MenuItem>
                    <MenuItem value={'March'}>March</MenuItem>
                    <MenuItem value={'April'}>April</MenuItem>
                    <MenuItem value={'May'}>May</MenuItem>
                    <MenuItem value={'June'}>June</MenuItem>
                    <MenuItem value={'July'}>July</MenuItem>
                    <MenuItem value={'August'}>August</MenuItem>
                    <MenuItem value={'September'}>September</MenuItem>
                    <MenuItem value={'October'}>October</MenuItem>
                    <MenuItem value={'November'}>November</MenuItem>
                    <MenuItem value={'December'}>December</MenuItem>
                  </Select>
                </FormControl>
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    height: '50px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '15px',
                    padding: '2%',
                  }}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleMonthlyReport}
                  >
                    حاصل کریں
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  width: '100%',
                  height: '300px',
                  padding: '5%',
                  textAlign: 'right',
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ paddingRight: '15px' }}
                >
                  کسٹمر رپورٹ پرنٹ کریں۔
                </Typography>
                <FormControl fullWidth sx={{ marginTop: '20px' }}>
                  <InputLabel id="demo-simple-select-label">
                    گاہک کو منتخب کریں۔
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={customer}
                    label="گاہک کو منتخب کریں۔"
                    onChange={handleCustomerChange}
                  >
                    {customers &&
                      customers.map((customer, index) => (
                        <MenuItem value={customer} key={index}>
                          {customer}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ marginTop: '40px' }}>
                  <InputLabel id="demo-simple-select-label">
                    مہینہ منتخب کریں۔
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={month}
                    label="Select Month"
                    onChange={handleMonthChange}
                  >
                    <MenuItem value={'January'}>January</MenuItem>
                    <MenuItem value={'February'}>February</MenuItem>
                    <MenuItem value={'March'}>March</MenuItem>
                    <MenuItem value={'April'}>April</MenuItem>
                    <MenuItem value={'May'}>May</MenuItem>
                    <MenuItem value={'June'}>June</MenuItem>
                    <MenuItem value={'July'}>July</MenuItem>
                    <MenuItem value={'August'}>August</MenuItem>
                    <MenuItem value={'September'}>September</MenuItem>
                    <MenuItem value={'October'}>October</MenuItem>
                    <MenuItem value={'November'}>November</MenuItem>
                    <MenuItem value={'December'}>December</MenuItem>
                  </Select>
                </FormControl>
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    height: '50px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '15px',
                    padding: '2%',
                  }}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleCustomerReport}
                  >
                    حاصل کریں
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            width: '100%',
            height: '350px',
            padding: '3%',
            marginTop: '40px',
            marginBottom: '30px',
          }}
        >
          {mode && mode === 'customer' ? (
            <Box
              sx={{ width: '100%', minHeight: '400px', textAlign: 'right' }}
              ref={print}
            >
              <Typography variant="h6">ڈیلر کا نام : {customer}</Typography>
              <Typography variant="h6">{month} : ماھ</Typography>
              <TableContainer>
                <Table
                  sx={{ minWidth: 700, marginTop: '20px' }}
                  aria-label="spanning table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="right" sx={{ width: '60px' }}>
                        ادائیگی کی حیثیت
                      </TableCell>
                      <TableCell align="right" sx={{ width: '80px' }}>
                        کل رقم
                      </TableCell>
                      <TableCell align="right" sx={{ width: '80px' }}>
                        مقدار
                      </TableCell>
                      <TableCell align="right" sx={{ width: '80px' }}>
                        شرح
                      </TableCell>
                      <TableCell align="right" sx={{ width: '100px' }}>
                        تاریخ
                      </TableCell>
                      <TableCell align="right" sx={{ width: '60px' }}>
                        نمبر
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {customerData &&
                      customerData.map((data, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell align="right">
                              {data?.status ? 'ادا' : 'باقی'}
                            </TableCell>
                            <TableCell align="right">
                              {data?.item?.lineTotal}
                            </TableCell>
                            <TableCell align="right">
                              {data?.item?.quantity}
                            </TableCell>
                            <TableCell align="right">
                              {data?.item?.rate}
                            </TableCell>
                            <TableCell align="right">{data?.date}</TableCell>
                            <TableCell align="right">{index + 1}</TableCell>
                          </TableRow>
                        )
                      })}
                    <br />
                    <TableRow>
                      <TableCell>ٹوٹل</TableCell>
                      <TableCell align="right">{total}</TableCell>
                      <TableCell rowSpan={3} />
                    </TableRow>
                    <TableRow>
                      <TableCell>ادا</TableCell>
                      <TableCell align="right">{amountPaid}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>باقی</TableCell>
                      <TableCell align="right">{amountBalance}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : mode === 'monthly' ? (
            <Box
              ref={print}
              sx={{
                width: '100%',
                minHeight: '400px',
                textAlign: 'right',
              }}
            >
              <Typography variant="h6">{month} : ماھ</Typography>
              <TableContainer>
                <Table
                  sx={{ minWidth: 700, marginTop: '20px' }}
                  aria-label="spanning table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="right" sx={{ width: '60px' }}>
                        ادائیگی کی حیثیت
                      </TableCell>
                      <TableCell align="right" sx={{ width: '80px' }}>
                        باقی رقم
                      </TableCell>
                      <TableCell align="right" sx={{ width: '80px' }}>
                        ادا شدہ رقم
                      </TableCell>
                      <TableCell align="right" sx={{ width: '80px' }}>
                        کل خریداری
                      </TableCell>
                      <TableCell align="right" sx={{ width: '120px' }}>
                        ڈیلر کا نام
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {monthlyData &&
                      monthlyData.map((data, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell align="right">
                              {data?.monthlyCustomerBalanceAmount > 0
                                ? 'باقی'
                                : 'ادا'}
                            </TableCell>
                            <TableCell align="right">
                              {data?.monthlyCustomerBalanceAmount}
                            </TableCell>
                            <TableCell align="right">
                              {data?.monthlyCustomerPaidAmount}
                            </TableCell>
                            <TableCell align="right">
                              {data?.monthlyCustomerTotal}
                            </TableCell>
                            <TableCell align="right">
                              {data?.customer}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TableContainer>
                <Table
                  sx={{ minWidth: 700, marginTop: '20px' }}
                  aria-label="spanning table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="right" sx={{ width: '60px' }}>
                        اخراجات
                      </TableCell>
                      <TableCell align="right" sx={{ width: '80px' }}>
                        باقی رقم
                      </TableCell>
                      <TableCell align="right" sx={{ width: '80px' }}>
                        ادا شدہ رقم
                      </TableCell>
                      <TableCell align="right" sx={{ width: '80px' }}>
                        کل بلاک کی مقدار
                      </TableCell>
                      <TableCell align="right" sx={{ width: '80px' }}>
                        کل فروخت
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="right">{monthTotalExpense}</TableCell>
                      <TableCell align="right">
                        {monthlySaleBalanceAmount}
                      </TableCell>
                      <TableCell align="right">
                        {monthlySalePaidAmount}
                      </TableCell>
                      <TableCell align="right">{monthlySaleUnits}</TableCell>
                      <TableCell align="right">{monthlySaleTotal}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : mode === 'yearly' ? (
            <Box
              ref={print}
              sx={{
                width: '100%',
                minHeight: '400px',
                textAlign: 'right',
              }}
            >
              <Typography variant="h6">{year} : سال</Typography>
              <TableContainer>
                <Table
                  sx={{ minWidth: 700, marginTop: '20px' }}
                  aria-label="spanning table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="right" sx={{ width: '60px' }}>
                        ادائیگی کی حیثیت
                      </TableCell>
                      <TableCell align="right" sx={{ width: '80px' }}>
                        باقی رقم
                      </TableCell>
                      <TableCell align="right" sx={{ width: '80px' }}>
                        ادا شدہ رقم
                      </TableCell>
                      <TableCell align="right" sx={{ width: '80px' }}>
                        کل خریداری
                      </TableCell>
                      <TableCell align="right" sx={{ width: '120px' }}>
                        ڈیلر کا نام
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {yearlyData &&
                      yearlyData.map((data, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell align="right">
                              {data?.yearlyCustomerBalanceAmount > 0
                                ? 'باقی'
                                : 'ادا'}
                            </TableCell>
                            <TableCell align="right">
                              {data?.yearlyCustomerBalanceAmount}
                            </TableCell>
                            <TableCell align="right">
                              {data?.yearlyCustomerPaidAmount}
                            </TableCell>
                            <TableCell align="right">
                              {data?.yearlyCustomerTotal}
                            </TableCell>
                            <TableCell align="right">
                              {data?.customer}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TableContainer>
                <Table
                  sx={{ minWidth: 700, marginTop: '20px' }}
                  aria-label="spanning table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="right" sx={{ width: '60px' }}>
                        اخراجات
                      </TableCell>
                      <TableCell align="right" sx={{ width: '80px' }}>
                        باقی رقم
                      </TableCell>
                      <TableCell align="right" sx={{ width: '80px' }}>
                        ادا شدہ رقم
                      </TableCell>
                      <TableCell align="right" sx={{ width: '80px' }}>
                        کل بلاک کی مقدار
                      </TableCell>
                      <TableCell align="right" sx={{ width: '80px' }}>
                        کل فروخت
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="right">{yearTotalExpense}</TableCell>
                      <TableCell align="right">
                        {yearlySaleBalanceAmount}
                      </TableCell>
                      <TableCell align="right">
                        {yearlySalePaidAmount}
                      </TableCell>
                      <TableCell align="right">{yearlySaleUnits}</TableCell>
                      <TableCell align="right">{yearlySaleTotal}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : null}
          {mode && (
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                height: '50px',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '25px',
                padding: '2%',
              }}
            >
              <Button
                variant="contained"
                sx={{ width: '60%' }}
                onClick={generatePrint}
              >
                پرنٹ حاصل کریں
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </>
  )
}

export default Dashboard
