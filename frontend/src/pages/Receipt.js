import React, { useState, useEffect, useRef } from 'react'

// CSS Import
import '../index.css'

// Redux Toolkit Import
import { useDispatch, useSelector } from 'react-redux'

// Redux Actions Import
import {
  getSales,
  createSales,
  updateSales,
} from '../app/redux/actions/salesActions'

// UUIDV4 import
import { v4 as uuidv4 } from 'uuid'

// Material UI Components Import
import {
  Box,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
} from '@mui/material'

// Components Import
import ReceiptTable from '../components/ReceiptTable'
import MetaData from '../components/MetaData'

// Import React To Print
import { useReactToPrint } from 'react-to-print'

const Receipt = () => {
  const dispatch = useDispatch()

  // Getting sales from redux state
  const { salesData } = useSelector((state) => state.sales)

  // React States
  const [selectedDate, setSelectedDate] = useState('')
  const [customer, setCustomer] = useState()
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [driverName, setDriverName] = useState('')
  const [driverVehicleNumber, setDriverVehicleNumber] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [rate, setRate] = useState(Number(''))
  const [quantity, setQuantity] = useState(Number(''))
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [amountPaid, setAmountPaid] = useState(0)
  const [status, setStatus] = useState('')

  // To add items in receipt table
  const handleReceiptItems = () => {
    let newItem = {
      id: uuidv4(),
      description: itemDescription,
      rate: rate,
      quantity: quantity,
      lineTotal: rate * quantity,
    }
    setItems((oldItems) => [...oldItems, newItem])
    setTotal((total) => (total += newItem.lineTotal))
  }

  // To remove item from receipt table
  const handleRemoveReceiptItem = (index) => {
    setItems(items.filter((item) => item.id !== index))
  }

  // status state change handler
  const handleChange = (event) => {
    setStatus(event.target.value)
  }

  let existedCustomer = []
  salesData?.sales?.filter((sale) => {
    return sale.customer.name === customer
    existedCustomer.push(sale)
  })

  // check total unpaid receipts
  let unpaidReceipts = []
  existedCustomer.length > 0 &&
    existedCustomer[0]?.receipts?.map((receipt) => {
      if (receipt.isPaid === false) {
        unpaidReceipts.push(receipt)
      }
    })

  // Print Summary

  const print = useRef()

  const generatePrint = useReactToPrint({
    content: () => print.current,
    documentTitle: 'dashboardPrint',
    onAfterPrint: () => alert('Receipt Printed Successfully!'),
  })

  // Receipt submit
  const handleReceiptSubmit = () => {
    // first check if the customer exists
    let existedCustomer = salesData?.sales?.filter((sale) => {
      return sale.customer.name === customer
    })

    // Check if the status is paid
    let checkPaid = status === 'Paid' ? true : false

    // customer data
    const customerData = {
      name: customer,
      phone: phone,
      address: address,
    }

    // amount balance
    let amountBalance = total - amountPaid

    // receipt data
    const receiptData = {
      isPaid: checkPaid,
      date: selectedDate,
      items: items,
      amountPaid: amountPaid,
      amountBalance: amountBalance,
      driver: driverName,
      vehicle: driverVehicleNumber,
    }

    // Sales model data
    const saleData = {
      customer: customerData,
      receipts: receiptData,
    }

    const receiptUpdateData = {
      userId: existedCustomer && existedCustomer[0]?._id,
      receiptData,
    }

    // if exists then just update customer data

    new Promise((resolve, reject) => {
      resolve(
        existedCustomer && existedCustomer.length > 0
          ? dispatch(updateSales(receiptUpdateData))
          : dispatch(createSales(saleData)),
        generatePrint(),
      )
    }).then(() => window.location.reload())
  }

  useEffect(() => {
    dispatch(getSales())
  }, [dispatch])

  return (
    <>
      {/* MetaData */}
      <MetaData title="Ice Dashboard | Receipt" />
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
            paddingRight: { xs: '10px', sm: '20px', md: '30px' },
            paddingTop: { xs: '10px', sm: '20px', md: '30px' },
            borderBottom: '2px solid #1976d2',
            textAlign: 'right',
            justifyContent: 'flex-end',
          }}
        >
          <Typography variant="h5">نئی رسید بنائیں</Typography>
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
                minHeight: '300px',
                border: '2px solid #1976d2',
                marginTop: '20px',
                borderRadius: '20px',
                padding: '15px',
              }}
            >
              <Grid container sx={{ height: '100%', width: '100%' }}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    height: '70px',
                    textAlign: 'right',
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      paddingRight: '15px',
                      borderBottom: '1.5px solid #1976d2',
                      width: '98%',
                    }}
                  >
                    گاھک کی تفصیلات
                  </Typography>
                </Grid>
                <Grid item sx={{ minHeight: '160px', width: '100%' }} xs={12}>
                  <Box sx={{ width: '100%', padding: '30px 0' }}>
                    <Grid
                      container
                      sx={{
                        justifyContent: 'center',
                        gap: '15px 0px',
                        flexDirection: 'row-reverse',
                      }}
                    >
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
                          label="گاھک کا نام"
                          helperText="درکار*"
                          sx={{ width: '94%' }}
                          inputProps={{
                            min: 0,
                            style: { textAlign: 'right' },
                          }}
                          onChange={(event) => setCustomer(event.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          id="outlined-error-helper-text"
                          label="فون"
                          helperText="درکار*"
                          sx={{ width: '94%' }}
                          inputProps={{
                            min: 0,
                            style: { textAlign: 'right' },
                          }}
                          onChange={(event) => setPhone(event.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          id="outlined-error-helper-text"
                          label="پتہ"
                          helperText="درکار*"
                          sx={{ width: '94%' }}
                          inputProps={{
                            min: 0,
                            style: { textAlign: 'right' },
                          }}
                          onChange={(event) => setAddress(event.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          id="outlined-error-helper-text"
                          label="ڈرائیور کا نام"
                          helperText="درکار*"
                          sx={{ width: '94%' }}
                          inputProps={{
                            min: 0,
                            style: { textAlign: 'right' },
                          }}
                          onChange={(event) =>
                            setDriverName(event.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          id="outlined-error-helper-text"
                          label="گاڑی کا نمبر"
                          helperText="درکار*"
                          inputProps={{
                            min: 0,
                            style: { textAlign: 'right' },
                          }}
                          sx={{ width: '94%' }}
                          onChange={(event) =>
                            setDriverVehicleNumber(event.target.value)
                          }
                        />
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
                marginTop: '20px',
                borderRadius: '20px',
                padding: '15px',
              }}
            >
              <Grid container sx={{ height: '100%', width: '100%' }}>
                <Grid item xs={12} sx={{ height: '70px', textAlign: 'right' }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      paddingRight: '15px',
                      borderBottom: '1.5px solid #1976d2',
                      width: '98%',
                    }}
                  >
                    رسید اشیاء
                  </Typography>
                </Grid>
                <Grid item sx={{ minHeight: '160px', width: '100%' }} xs={12}>
                  <Box
                    sx={{
                      width: '100%',
                      padding: '30px 0',
                      textAlign: 'right',
                    }}
                  >
                    <Typography variant="subtitle2">
                      رسید میں آئٹمز شامل کرنے کے لیے آئٹم کی تفصیلات درج کریں۔
                    </Typography>
                    <Grid container sx={{ flexDirection: 'row-reverse' }}>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          id="outlined-error-helper-text"
                          label="تفصیل"
                          helperText="درکار*"
                          name="description"
                          sx={{ width: '94%' }}
                          inputProps={{
                            min: 0,
                            style: { textAlign: 'right' },
                          }}
                          onChange={(event) =>
                            setItemDescription(event.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          id="outlined-error-helper-text"
                          label="شرح"
                          helperText="درکار*"
                          name="rate"
                          sx={{ width: '94%' }}
                          inputProps={{
                            min: 0,
                            style: { textAlign: 'right' },
                          }}
                          onChange={(event) => setRate(event.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          id="outlined-error-helper-text"
                          label="مقدار"
                          name="quantity"
                          helperText="درکار*"
                          sx={{ width: '94%' }}
                          inputProps={{
                            min: 0,
                            style: { textAlign: 'right' },
                          }}
                          onChange={(event) => setQuantity(event.target.value)}
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
                          onClick={handleReceiptItems}
                          disabled={!itemDescription || !rate || !quantity}
                        >
                          آئٹم شامل کریں
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid sx={{ minHeight: '320px', width: '100%' }} item xs={12}>
                  <ReceiptTable
                    items={items}
                    handleRemoveReceiptItem={handleRemoveReceiptItem}
                    height={'300px'}
                    remove={true}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                minHeight: '300px',
                border: '2px solid #1976d2',
                marginTop: '20px',
                borderRadius: '20px',
                padding: '15px',
              }}
            >
              <Grid container sx={{ height: '100%', width: '100%' }}>
                <Grid item xs={12} sx={{ height: '70px', textAlign: 'right' }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      paddingLeft: '15px',
                      borderBottom: '1.5px solid #1976d2',
                      width: '98%',
                    }}
                  >
                    رقم کی تفصیلات
                  </Typography>
                </Grid>
                <Grid item sx={{ minHeight: '160px', width: '100%' }} xs={12}>
                  <Box sx={{ width: '100%', padding: '30px 0' }}>
                    <Grid container sx={{ flexDirection: 'row-reverse' }}>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          id="outlined-error-helper-text"
                          InputProps={{
                            readOnly: true,
                          }}
                          inputProps={{
                            min: 0,
                            style: { textAlign: 'right' },
                          }}
                          value={total}
                          label="کل رقم"
                          sx={{ width: '94%' }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          id="outlined-error-helper-text"
                          onChange={(event) =>
                            setAmountPaid(event.target.value)
                          }
                          inputProps={{
                            min: 0,
                            style: { textAlign: 'right' },
                          }}
                          helperText="درکار*"
                          label="ادا شدہ رقم"
                          sx={{ width: '94%' }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          id="outlined-error-helper-text"
                          InputProps={{
                            readOnly: true,
                          }}
                          inputProps={{
                            min: 0,
                            style: { textAlign: 'right' },
                          }}
                          value={total - amountPaid}
                          label="باقی رقم"
                          sx={{ width: '94%' }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            ادائیگی کی حیثیت
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            inputProps={{
                              min: 0,
                              style: { textAlign: 'right' },
                            }}
                            label="ادائیگی کی حیثیت"
                            onChange={handleChange}
                          >
                            <MenuItem value={'Paid'}>ادا</MenuItem>
                            <MenuItem value={'Unpaid'}>باقی</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            {unpaidReceipts && unpaidReceipts.length >= 3 ? (
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
                <Alert
                  severity="error"
                  sx={{ width: '75%', fontWeight: 'bold', textAlign: 'right' }}
                >
                  اس گاہک کے پاس پہلے سے ہی 3 غیر ادا شدہ رسیدیں ہیں!
                </Alert>
              </Grid>
            ) : null}
          </Grid>
        </Box>
      </Box>
      <Box
        sx={{
          padding: '10px 0 80px 65px',
          minHeight: '50vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          ref={print}
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'flex-end',
            flexDirection: 'column',
            padding: '0 60px',
          }}
        >
          <Typography variant="subtitle1">تاریخ : {selectedDate}</Typography>
          <Typography variant="subtitle1">گاہک کا نام : {customer}</Typography>
          <Typography variant="subtitle1">فون : {phone}</Typography>
          <Typography variant="subtitle1">پتہ : {address}</Typography>
          <Box sx={{ width: '100%', margin: '50px 0' }}>
            <ReceiptTable
              items={items}
              handleRemoveReceiptItem={handleRemoveReceiptItem}
              height={'auto'}
              remove={false}
            />
          </Box>
          <Typography variant="subtitle1">کل رقم : {total}</Typography>
          <Typography variant="subtitle1">
            ادا شدہ رقم : {amountPaid}
          </Typography>
          <Typography variant="subtitle1">
            باقی رقم: {total - amountPaid}
          </Typography>
          <Typography variant="subtitle1">
            ادائیگی کی حیثیت : {status === 'Paid' ? 'ادا' : 'باقی'}
          </Typography>
        </Box>
        <Box sx={{ marginTop: '30px' }}>
          <Button
            variant="contained"
            sx={{ width: '330px' }}
            onClick={handleReceiptSubmit}
            disabled={
              !selectedDate ||
              !customer ||
              !phone ||
              !address ||
              !driverName ||
              !driverVehicleNumber ||
              !items ||
              !status ||
              !amountPaid ||
              unpaidReceipts.length > 3
            }
          >
            رسید بنائیں اور پرنٹ کریں۔
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default Receipt
