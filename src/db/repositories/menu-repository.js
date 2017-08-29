const Menu= require('../models/menu')

module.exports = {
  get (id) {
    return Menu.findOne({ id })
  },
  getByLocation (locationId, startDate, endDate) {
    return Menu.find({
      locationId,
      date: {
        $gte: startDate,
        $lt: endDate
      }
    })
  },
  create (menuIn) {
    const menu = new Menu(menuIn)
    return menu.save()
  },
  createBulk (menusIn) {
    return Menu.insertMany(menusIn)
  }
}
