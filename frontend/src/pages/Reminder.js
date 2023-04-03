import React from 'react'

// Material UI Import
import { Box, Typography, Alert } from '@mui/material'

// Components Import
import MetaData from '../components/MetaData'

const Reminder = () => {
  return (
    <>
      <MetaData title="Ice Dashboard | Reminder" />
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
            paddingLeft: { xs: '10px', sm: '20px', md: '30px' },
            paddingTop: { xs: '10px', sm: '20px', md: '30px' },
            borderBottom: '2px solid #1976d2',
          }}
        >
          <Typography variant="h5">Reminders</Typography>
        </Box>
        <Box
          sx={{
            height: '65vh',
            width: '80%',
            border: '2px solid #1976d2',
            marginTop: '30px',
            borderRadius: '20px',
            overflowY: 'scroll',
            padding: {
              xs: '25px 14px',
              sm: '25px 25px',
              md: '25px 50px',
            },
          }}
        >
          <Alert
            variant="filled"
            severity="info"
            sx={{
              height: '70px',
              alignItems: 'center',
              borderRadius: '14px',
              marginBottom: '16px',
            }}
          >
            This is an info alert — check it out!
          </Alert>
          <Alert
            variant="filled"
            severity="info"
            sx={{ height: '70px', alignItems: 'center', borderRadius: '14px' }}
          >
            This is an info alert — check it out!
          </Alert>
        </Box>
      </Box>
    </>
  )
}

export default Reminder
