const Location = require('../models/location')

module.exports = {
  create (locationIn) {
    return Location.insert(locationIn)
  },
  getAll () {
    return Location.find()
  },
  get (slug) {
    return Location.find({ slug })
  }
}

