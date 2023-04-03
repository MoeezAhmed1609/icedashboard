import React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

import HighlightOffIcon from '@mui/icons-material/HighlightOff'

const columns = [
  {
    id: 'status',
    label: 'ادائیگی کی حیثیت',
    minWidth: 80,
    align: 'right',
  },
  {
    id: 'total_amount',
    label: 'کل رقم',
    minWidth: 140,
    align: 'right',
  },
  {
    id: 'quantity',
    label: 'مقدار',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'rate',
    label: 'شرح',
    minWidth: 100,
    align: 'right',
  },
  { id: 'name', label: 'گاہک کا نام', minWidth: 220, align: 'right' },
  { id: 'date', label: 'تاریخ', minWidth: 100, align: 'right' },
  { id: 'delete', label: '', minWidth: 40, align: 'right' },
]

export default function SalesTable({ sales, handleDeleteSaleReceipt }) {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(8)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  // making sales data
  let receipts = []
  sales?.filter((sale) => {
    // console.log(sale)
    sale?.receipts?.filter((receipt) => {
      receipt?.items?.map((item) => {
        let data = {
          date: receipt?.date,
          customer: sale?.customer,
          status: receipt?.isPaid,
          item: item,
          id: sale?.id,
          receipt: receipt._id,
        }
        receipts.unshift(data)
      })
    })
  })
  return (
    <>
      <TableContainer sx={{ maxHeight: 460 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {receipts &&
              receipts
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((receipt) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={receipt?.item?.id}
                    >
                      <TableCell align="right">
                        {receipt?.status ? 'ادا' : 'بقایا'}
                      </TableCell>
                      <TableCell align="right">
                        {receipt?.item?.lineTotal}
                      </TableCell>
                      <TableCell align="right">{receipt?.item?.rate}</TableCell>

                      <TableCell align="right">
                        {receipt?.item?.quantity}
                      </TableCell>
                      <TableCell align="right">
                        {receipt?.customer?.name}
                      </TableCell>
                      <TableCell component="th" scope="row" align="right">
                        {receipt?.date}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Remove">
                          <IconButton
                            aria-label="remove"
                            onClick={() =>
                              handleDeleteSaleReceipt(
                                receipt.id,
                                receipt.receipt,
                              )
                            }
                          >
                            <HighlightOffIcon color="error" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  )
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[8, 15, 25]}
        component="div"
        count={receipts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}
