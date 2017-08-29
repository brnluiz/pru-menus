const locationService = require('../../../db/repositories/location-repository')

module.exports = {
  async create (locationIn) {
    return locationService.create(locationIn)
  },
  async getAll () {
    return locationService.getAll()
  },
  async get (slug) {
    return locationService.get(slug)
  }
}
