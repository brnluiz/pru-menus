const joi = require('../schemas/menu-schema')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

// Set indexes
const schema = new mongoose.Schema({
  items: { type: [], required: true },
  date: { type: Date, default: Date.now },
  locationId: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
})
schema.index({ locationId: 1, date: 1 }, { unique: true })

const Menu = mongoose.model('Menu', schema)
Menu.joi = joi

module.exports = Menu
