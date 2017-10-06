const Menu = require('../models/menu')

module.exports = {
  async get (id) {
    const res = await Menu.findById(id).exec()
    return res ? res.toJSON() : null
  },
  async getByLocation (locationId, startDate, endDate) {
    const conditions = { locationId }

    if (startDate && endDate) {
      conditions.date = { $gte: startDate, $lte: endDate }
    } else if (startDate) {
      conditions.date = startDate
    }

    const res = await Menu.find(conditions).exec()
    return res ? res.map(item => item.toJSON()) : []
  },
  async create (menuIn) {
    const menu = await Menu.create(menuIn)

    const res = await Menu.findById(menu._id).exec()
    return res ? res.toJSON() : null
  },
  async createBulk (menusIn) {
    const res = await Menu.insertMany(menusIn)
    return res.map(item => item.toJSON())
  }
}
