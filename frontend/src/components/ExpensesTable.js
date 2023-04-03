import React, { useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

// Redux Toolkit Import
import { useSelector, useDispatch } from 'react-redux'

import { getExpenses } from '../app/redux/actions/expenseActions'

const columns = [
  {
    id: 'status',
    label: 'ادائیگی کی حیثیت',
    width: 80,
    align: 'right',
  },
  {
    id: 'rate',
    label: 'ادا شدہ رقم',
    width: 100,
    align: 'right',
  },
  {
    id: 'quantity',
    label: 'خرچہ',
    width: 200,
    align: 'right',
  },
  { label: 'تاریخ', width: 110, align: 'right' },
  { label: 'ID', width: 80, align: 'center' },
]

export default function ExpensesTable() {
  const dispatch = useDispatch()
  // Getting expenses from redux state
  const { expensesData } = useSelector((state) => state.expenses)
  

  // Controlled Table
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(8)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    dispatch(getExpenses())
  }, [dispatch])

  return (
    <>
      <TableContainer sx={{ maxHeight: 370, textAlign: 'right' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ maxWidth: column.width, overflow: 'hidden' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {expensesData?.expenses
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((expense, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={expense._id}
                  >
                    <TableCell align="right">
                      {expense.expense.status ? 'ادا' : 'بقیہ'}
                    </TableCell>
                    <TableCell align="right">
                      {expense.expense.amountPaid}
                    </TableCell>
                    <TableCell align="right">
                      {expense.expense.description}
                    </TableCell>
                    <TableCell align="right">{expense.date}</TableCell>
                    <TableCell align="center">{index + 1}</TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[8, 15, 25]}
        component="div"
        count={expensesData?.expenses?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}
