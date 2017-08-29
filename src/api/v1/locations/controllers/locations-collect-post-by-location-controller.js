const locationService = require('../location-service')

const workerPath = (id) => `../workers/collect/${id}`

module.exports = async (req, res, next) => {
  const locationSlug = req.params.locationSlug

  let location
  try {
    location = await locationService.get(locationSlug)
  } catch (err) {
    return next(err)
  }

  try {
    const worker = await require(workerPath(location.slug))
    await worker.run(location)
  } catch (err) {
    return next(`Error on ${location.slug} worker: ${err}`)
  }

  res.sendStatus(201)
  next()
}
