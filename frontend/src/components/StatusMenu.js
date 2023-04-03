import React, { useState } from 'react'
import { styled, alpha } from '@mui/material/styles'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {
  FormControl,
  InputLabel,
  Select,
  Button,
  Menu,
  MenuItem,
  Divider,
  TextField,
} from '@mui/material'

const StyledMenu = styled((props) => (
  <Menu
    sx={{ minWidth: '300px' }}
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 300,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}))

export default function StatusMenu({ receipt, handleReceiptUpdate }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [status, setStatus] = useState('')
  const [amountPaid, setAmountPaid] = useState('')

  const isPaid = status === 'Paid' ? true : false

  const amountBalance = receipt.amountBalance - amountPaid

  const totalAmountPaid = Number(receipt.amountPaid) + Number(amountPaid)

  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleChange = (event) => {
    setStatus(event.target.value)
  }

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{ fontSize: '14px' }}
      >
        اسٹیٹس کو تبدیل کریں۔
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem disableRipple>
          <TextField
            id="outlined-error-helper-text"
            label="ادا شدہ رقم"
            helperText="درکار*"
            fullWidth
            onChange={(event) => setAmountPaid(event.target.value)}
          />
        </MenuItem>
        <MenuItem disableRipple>
          <TextField
            id="outlined-error-helper-text"
            label="باقی رقم"
            value={receipt.amountBalance - amountPaid}
            InputProps={{
              readOnly: true,
            }}
            helperText="درکار*"
            fullWidth
          />
        </MenuItem>
        <MenuItem disableRipple>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              ادائیگی کی حیثیت
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="ادائیگی کی حیثیت"
              onChange={handleChange}
            >
              <MenuItem value={'Paid'}>ادا</MenuItem>
              <MenuItem value={'Unpaid'}>باقی</MenuItem>
            </Select>
          </FormControl>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={handleClose}
          disableRipple
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Button
            variant="contained"
            sx={{ width: '86%' }}
            onClick={() =>
              handleReceiptUpdate(
                receipt._id,
                isPaid,
                amountBalance,
                totalAmountPaid,
              )
            }
            disabled={!status || !amountPaid}
          >
            جمع کرائیں
          </Button>
        </MenuItem>
      </StyledMenu>
    </div>
  )
}
