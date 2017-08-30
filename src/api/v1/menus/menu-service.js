const error = require('../../../errors')
const locationRepository = require('../../../db/repositories/location-repository')
const menuRepository = require('../../../db/repositories/menu-repository')

module.exports = {
  async get (id) {
    return menuRepository.get(id)
  },
  async getByLocation (locationSlug, startDate, endDate) {
    const location = await locationRepository.get(locationSlug)
    if (!location) {
      throw new error.NotFoundError('Location not found')
    }

    const menus = await menuRepository.getByLocation(location._id, startDate, endDate)
    return menus
  },
  async create (menuIn) {
    return menuRepository.create(menuIn)
  },
  async createBulk (menusIn) {
    return menuRepository.createBulk(menusIn)
  }
}
