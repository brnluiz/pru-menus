const Menu = require('../models/menu')

module.exports = {
  get (id) {
    return Menu.findById(id)
  },
  getByLocation (locationId, startDate, endDate) {
    const query = { locationId }

    if (startDate && endDate) {
      query.date = { $gte: startDate, $lt: endDate }
    } else if (startDate) {
      query.date = startDate
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
