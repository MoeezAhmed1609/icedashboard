const app = require('./app')

// MongoDB Connection Import
const connectMongoDB = require('./mongo/mongodb')

// DOTENV Configuration
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({ path: 'backend/config/.env' })
}

// Connecting To MongoDB
connectMongoDB()

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})
