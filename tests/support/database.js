const dotenv = require('dotenv')
const mongoose = require('mongoose')
const mongooseToJson = require('@meanie/mongoose-to-json')

mongoose.Promise = global.Promise
mongoose.plugin(mongooseToJson)

dotenv.config()

module.exports = {
  async init () {
    // Initialize Mongoose ORM
    await mongoose.connect(process.env.MONGODB_URI, {
      useMongoClient: true
    })

    return mongoose.connection.db.dropDatabase()
  }
}
