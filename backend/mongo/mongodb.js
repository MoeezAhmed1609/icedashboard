const mongoose = require('mongoose')

const connectMongoDB = () => {
  mongoose
    .connect(process.env.MONGOOSE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`MongoDB connected with server: ${data.connection.host}`)
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = connectMongoDB
