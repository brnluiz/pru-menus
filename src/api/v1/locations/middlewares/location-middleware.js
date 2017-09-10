const celebrate = require('celebrate')
const schema = require('../../../../db/schemas/location-schema')

module.exports = (req, res, next) =>
  celebrate({
    body: schema
  }, {
    abortEarly: false
  })(req, res, next)
