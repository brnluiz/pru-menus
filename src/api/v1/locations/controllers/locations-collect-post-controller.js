const error = require('../../../../errors')
const eventService = require('../../../../event-service')
const locationService = require('../location-service')

module.exports = async (req, res, next) => {
  try {
    // Will be executed async
    const locations = await locationService.getAll()

    locations.forEach((location) =>
      eventService.emit('location.collect', location))

    res.sendStatus(201)
    next()
  } catch (err) {
    if (err instanceof error.NotFoundError) return next(err)
    else if (err instanceof error.ValidationError) return next(err)

    return next(new error.InternalServerError(err.message, err))
  }
}
