const error = require('../../../../errors')
const locationService = require('../location-service')

module.exports = async (req, res, next) => {
  try {
    const location = req.body
    await locationService.create(location)

    res.sendStatus(201)
    next()
  } catch (err) {
    return next(new error.InternalServerError(err.message, err))
  }
}
