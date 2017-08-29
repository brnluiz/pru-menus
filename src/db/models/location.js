const joi = require('../schemas/location-schema')
const { schema, mongoose } = require('./_mongo')(joi)

// Set indexes
schema.slug.unique = true

const Location = mongoose.model('Location', schema)
Location.joi = joi

module.exports = Location
