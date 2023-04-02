const mongoose = require('mongoose')

const salesSchema = mongoose.Schema({
  customer: {
    name: {
      type: String,
      required: [true, 'Customer name is required!'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required!'],
    },
    address: {
      type: String,
      required: [true, 'Customer address is required!'],
    },
  },
  receipts: [
    {
      isPaid: { type: Boolean, default: false },
      date: { type: String, required: [true, 'Date must be mentioned'] },
      year: {
        type: String,
        default: function () {
          const d = new Date(this.date)
          return d.getFullYear()
        },
      },
      month: {
        type: String,
        default: function () {
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

          const d = new Date(this.date)
          return monthNames[d.getMonth()]
        },
      },
      items: [
        {
          id: String,
          description: {
            type: String,
            required: [true, 'Product description is required!'],
          },
          rate: {
            type: Number,
            required: [true, 'Identify product rate!'],
          },
          quantity: {
            type: Number,
            required: [true, 'Identify product quantity!'],
          },
          lineTotal: Number,
        },
      ],
      amountPaid: { type: Number, required: true },
      amountBalance: { type: Number, required: true },
      driver: {
        type: String,
        required: true,
      },
      vehicle: {
        type: String,
        required: true,
      },
    },
  ],
  // yearlyData: [
  //   {
  //     year: { type: Number, required: true },
  //     yearlySalesTotal: { type: Number, default: 0 },
  //     yearlySalesTotalUnits: { type: Number, default: 0 },
  //   },
  // ],
  // monthlyData: [
  //   {
  //     month: { type: Number, required: true },
  //     monthlySalesTotal: { type: Number, default: 0 },
  //     monthlySalesTotalUnits: { type: Number, default: 0 },
  //   },
  // ],
  // dailyData: [
  //   {
  //     daily: { type: Date, required: true },
  //     dailySalesTotal: { type: Number, default: 0 },
  //     dailySalesTotalUnits: { type: Number, default: 0 },
  //   },
  // ],
})

module.exports = mongoose.model('Sales', salesSchema)
