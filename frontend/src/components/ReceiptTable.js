import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Tooltip, IconButton, Box, Typography } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

export default function ReceiptTable({
  items,
  handleRemoveReceiptItem,
  height,
  remove,
}) {
  return (
    <TableContainer
      sx={{
        minHeight: { height },
        width: '100%',
      }}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">لائن ٹوٹل</TableCell>
            <TableCell align="right">مقدار</TableCell>
            <TableCell align="right">شرح</TableCell>
            <TableCell align="right" sx={{ width: '400px' }}>
              تفصیل
            </TableCell>
            {remove === true ? (
              <TableCell sx={{ width: '50px' }}></TableCell>
            ) : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {items?.length > 0 ? (
            items?.map((item, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">
                  {Number(item?.rate) * Number(item?.quantity)}
                </TableCell>
                <TableCell align="right">{item?.quantity}</TableCell>
                <TableCell align="right">{item?.rate}</TableCell>
                <TableCell component="th" scope="row" align="right">
                  {item?.description}
                </TableCell>
                {remove === true ? (
                  <TableCell sx={{ width: '50px' }}>
                    <Tooltip title="Remove">
                      <IconButton
                        aria-label="remove"
                        onClick={() => handleRemoveReceiptItem(item.id)}
                      >
                        <HighlightOffIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                ) : null}
              </TableRow>
            ))
          ) : (
            <Box>
              <Typography variant="h6">کوئی رسید اشیاء نہیں</Typography>
            </Box>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
