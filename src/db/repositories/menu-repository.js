const Menu = require('../models/menu')

module.exports = {
  get (id) {
    return Menu.findById(id)
  },
  getByLocation (locationId, startDate, endDate) {
    const query = { locationId }

    if (startDate || endDate) {
      query.date = {}

      if (startDate) query.date['$gte'] = startDate
      if (endDate) query.date['$lt'] = endDate
    }

    return Menu.find(query)
  },
  create (menuIn) {
    return Menu.create(menuIn)
  },
  createBulk (menusIn) {
    return Menu.insertMany(menusIn)
  }
}
