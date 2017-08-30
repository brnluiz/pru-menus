const locationRepository = require('../../../db/repositories/location-repository')
const menuRepository = require('../../../db/repositories/menu-repository')

module.exports = {
  async get (id) {
    return menuRepository.get(id)
  },
  async getByLocation (locationSlug, startDate, endDate) {
    const { _id } = await locationRepository.get(locationSlug)

    return menuRepository.getByLocation(_id, startDate, endDate)
  },
  async create (menuIn) {
    return menuRepository.create(menuIn)
  },
  async createBulk (menusIn) {
    return menuRepository.createBulk(menusIn)
  }
}
