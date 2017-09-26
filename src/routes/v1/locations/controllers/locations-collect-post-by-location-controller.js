const error = require('../../../../errors')
const locationService = require('../location-service')

const workerPath = (id) => `../workers/collect/${id}`

module.exports = async (req, res, next) => {
  const locationSlug = req.params.locationSlug

  let location
  try {
    location = await locationService.get(locationSlug)
  } catch (err) {
    if (err instanceof error.NotFoundError) return next(err)

    return next(new error.InternalServerError(err.message, err))
  }

  try {
    const worker = await require(workerPath(location.slug))
    await worker.run(location)
  } catch (err) {
    const msg = `Error on ${location.slug} worker`
    return next(new error.InternalServerError(msg, err))
  }

  res.sendStatus(201)
  next()
}
