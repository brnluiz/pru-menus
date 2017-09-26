const joi = require('../schemas/location-schema')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

// Set indexes
const schema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  price: { type: Number },
  description: { type: String },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
})

const Location = mongoose.model('Location', schema)
Location.joi = joi

module.exports = Location
