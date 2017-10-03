const mongoose = require('mongoose')
const error = require('../errors')
const locationRepository = require('../db/repositories/location-repository')
const menuRepository = require('../db/repositories/menu-repository')

module.exports = {
  async get (id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new error.ValidationError('Not a valid id')
    }

    const menu = await menuRepository.get(id)
    if (!menu) {
      throw new error.NotFoundError('Menu not found')
    }

    return menu
  },
  async getByLocation (locationSlug, startDate, endDate) {
    const location = await locationRepository.get(locationSlug)
    if (!location) {
      throw new error.NotFoundError('Location not found')
    }

    const menus = await menuRepository.getByLocation(location._id, startDate, endDate)
    if (!menus.length) {
      throw new error.NotFoundError('Menus not found')
    }

    return menus
  },
  async create (menuIn) {
    return menuRepository.create(menuIn)
  },
  async createBulk (menusIn) {
    return menuRepository.createBulk(menusIn)
  }
}
