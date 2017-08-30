const locationRepository = require('../../../db/repositories/location-repository')

module.exports = {
  async create (locationIn) {
    return locationRepository.create(locationIn)
  },
  async getAll () {
    return locationRepository.getAll()
  },
  async get (slug) {
    return locationRepository.get(slug)
  }
}
