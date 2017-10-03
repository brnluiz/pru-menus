const error = require('../errors')
const locationRepository = require('../db/repositories/location-repository')

module.exports = {
  create (locationIn) {
    return locationRepository.create(locationIn)
  },
  async getAll () {
    const locations = await locationRepository.getAll()

    if (!locations) {
      throw new error.NotFoundError('No location found')
    }

    return locations
  },
  async get (slug) {
    const location = await locationRepository.get(slug)

    if (!location) {
      throw new error.NotFoundError('Location not found')
    }

    return location
  }
}
