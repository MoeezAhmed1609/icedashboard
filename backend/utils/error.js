const ErrorHandler = require('../utils/errorHandler')

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.message = err.message || 'Internal Server Error'

  // Wrong mongodb Id input error

  if (err.name === 'CastError') {
    const message = `Resource not found, Invalid: ${err.path}`
    err = new ErrorHandler(message, 404)
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `${Object.keys(err.keyValue)} already exists!`
    err = new ErrorHandler(message, 400)
  }
}
