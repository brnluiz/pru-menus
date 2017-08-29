const joi = require('../schemas/menu-schema')
const { schema, mongoose } = require('./_mongo')(joi)

// Set indexes
schema.locationId.unique = true
schema.date.unique = true

const Menu = mongoose.model('Menu', schema)
Menu.joi = joi

module.exports = Menu
