import React from 'react'

// Redux Toolkit Import
import { useSelector } from 'react-redux'

// Material UI Import
import { Box, Typography } from '@mui/material'

// Components Import
import LedgerTable from '../components/LedgerTable'
import MetaData from '../components/MetaData'

const Ledger = () => {
  // Getting sales from redux state
  const { salesData } = useSelector((state) => state.sales)

  // React States
  const ledger = []

  salesData?.sales?.map((sale) => {
    let receipts = []
    sale?.receipts.map((receipt) => {
      if (receipt.isPaid === false) {
        receipts.push(receipt)
      }
    })
    ledger.push({
      customer: sale?.customer,
      receipts,
    })
  })
  return (
    <>
      <MetaData title="Ice Dashboard | Ledger" />
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
          }}
        >
          <Typography variant="h5">بقایاجات</Typography>
        </Box>
        <Box
          sx={{
            minHeight: '65vh',
            width: '90%',
            border: '2px solid #1976d2',
            marginTop: '30px',
            borderRadius: '20px',
            padding: {
              xs: '20px 14px',
              sm: '20px',
            },
          }}
        >
          <LedgerTable ledger={ledger} />
        </Box>
      </Box>
    </>
  )
}

export default Ledger
