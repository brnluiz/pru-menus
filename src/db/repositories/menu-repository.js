const Menu = require('../models/menu')

module.exports = {
  get (id) {
    return Menu.findOne({ id }).lean()
  },
  getByLocation (locationId, startDate, endDate) {
    const query = { locationId }

    if (startDate) query.date['$gte'] = startDate
    if (endDate) query.date['$lt'] = endDate

    return Menu.find(query).lean()
  },
  create (menuIn) {
    return Menu.create(menuIn)
  },
  createBulk (menusIn) {
    return Menu.insertMany(menusIn)
  }
}
