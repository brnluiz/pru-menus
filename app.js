const app = require('express')()
const auth = require('express-basic-auth')
const bodyParser = require('body-parser')
const celebrate = require('celebrate')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const configs = require('./configs')
const log = require('./src/log')

dotenv.config()

// Express middleware: json request parser
app.use(bodyParser.json())

// Express middlware: auth
app.use(auth(configs.auth))

// Express routes
require('./src/routes/v1')(app)

// Express middleware: celebrate error handler
app.use(celebrate.errors())

// Express middleware: error handler
app.use((error, req, res, next) => {
  if (!(error instanceof Object)) {
    res.status(500).send({ error })
  }

  const message = error.message || 'Oops... Some dog ate your request!'
  const status = error.status || 500
  const type = error.name || 'InternalServerError'
  res.status(status).send({ error: message, type })
})

// Initialize Express server
const port = process.env.PORT
app.listen(port, () => log.info('Up and running!'))

// Initialize Mongoose ORM
mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true
})

module.exports = app
