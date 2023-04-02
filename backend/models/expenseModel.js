const mongoose = require('mongoose')

const expensesSchema = mongoose.Schema({
  date: {
    type: String,
    required: [true, 'Date must be mentioned!'],
  },
  expense: {
    description: {
      type: String,
      required: [true, 'Expense description is required!'],
    },
    amountPaid: {
      type: Number,
      required: [true, 'Mention total paid amount!'],
    },
    status: { type: Boolean, default: true },
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
  },
})

module.exports = mongoose.model('Expenses', expensesSchema)
