const Location = require('../models/location')

module.exports = {
  create (locationIn) {
    const location = new Location(locationIn)
    return location.save()
  },
  getAll () {
    return Location.find()
  },
  get (slug) {
    return Location.find({ slug })
  }
}
