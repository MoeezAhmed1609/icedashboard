import React, { useState } from 'react'

// Redux Toolkit Import
import { useDispatch } from 'react-redux'

// Redux Actions Import
import { updateSalesReceipt } from '../app/redux/actions/salesActions'

// PropTypes Import
import PropTypes from 'prop-types'

// Material UI Components Import
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Tooltip,
} from '@mui/material'

// Material UI Icons Import
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

// Components Import
import StatusMenu from './StatusMenu'

function Row(props) {
  const dispatch = useDispatch()

  const { row } = props
  const [open, setOpen] = React.useState(false)

  console.log(row)

  // handleReceiptUpdate
  const handleReceiptUpdate = (receiptId, isPaid, balance, paid) => {
    let receiptUpdateData = {
      receiptId: receiptId,
      isPaid: isPaid,
      amountBalance: balance,
      amountPaid: paid,
    }
    dispatch(updateSalesReceipt(receiptUpdateData))
    window.location.replace('/dashboard')
  }
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="right">{row.totalUnpaidAmount}</TableCell>
        <TableCell align="right">{row.totalUnpaidReceipts}</TableCell>
        <TableCell align="right">{row.phone}</TableCell>
        <TableCell component="th" scope="row" align="right">
          {row.name}
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow sx={{ maxHeight: '260px', overflowY: 'scroll' }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, textAlign: 'right' }}>
              <Typography variant="h6" gutterBottom component="div">
                غیر ادا شدہ رسیدیں
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: '80px' }} align="right">
                      ادائیگی کی حالت
                    </TableCell>
                    <TableCell sx={{ width: '100px' }} align="right">
                      باقی رقم
                    </TableCell>
                    <TableCell sx={{ width: '100px' }} align="right">
                      ادا شدہ رقم
                    </TableCell>
                    <TableCell sx={{ width: '100px' }} align="right">
                      کل رقم
                    </TableCell>
                    <TableCell sx={{ width: '60px' }} align="right">
                      مقدار
                    </TableCell>
                    <TableCell sx={{ width: '100px' }} align="right">
                      Date
                    </TableCell>
                    <TableCell sx={{ width: '30px' }} align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.receipts?.map((receipt) => (
                    <TableRow key={receipt._id}>
                      <TableCell align="right">
                        <StatusMenu
                          receipt={receipt}
                          handleReceiptUpdate={handleReceiptUpdate}
                        />
                      </TableCell>
                      <TableCell align="right">
                        {receipt?.amountBalance}
                      </TableCell>
                      <TableCell align="right">{receipt?.amountPaid}</TableCell>
                      <TableCell align="right">
                        {receipt?.amountPaid + receipt?.amountBalance}
                      </TableCell>
                      <TableCell align="right">{row?.totalQuantity}</TableCell>
                      <TableCell component="th" scope="row" align="right">
                        {receipt.date}
                      </TableCell>
                      <TableCell sx={{ width: '30px' }}>
                        <Tooltip title="منسوخ">
                          <IconButton
                            aria-label="remove"
                            // onClick={() => handleRemoveReceiptItem(item.id)}
                          >
                            <HighlightOffIcon color="error" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
}

export default function LedgerTable({ ledger }) {
  const rows = []
  ledger?.map((data) => {
    let totalBalanceAmount = 0
    let totalQuantity = 0

    data?.receipts?.map((receipt) => {
      totalBalanceAmount += receipt?.amountBalance
      receipt?.items?.map((item) => {
        totalQuantity += item.quantity
      })
    })
    let rowData = {
      name: data?.customer?.name,
      phone: data?.customer?.phone,
      totalUnpaidReceipts: data.receipts.length,
      totalUnpaidAmount: totalBalanceAmount,
      receipts: data.receipts,
      totalQuantity: totalQuantity,
    }
    rows.unshift(rowData)
  })
  return (
    <TableContainer>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="right">کل غیر ادا شدہ رقم</TableCell>
            <TableCell align="right">کل بلا معاوضہ رسیدیں۔</TableCell>
            <TableCell align="right">فون</TableCell>
            <TableCell align="right">گاہک کا نام</TableCell>
            <TableCell sx={{ width: '60px' }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) =>
            row && row?.receipts.length > 0 ? (
              <Row key={row.name} row={row} />
            ) : null,
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
