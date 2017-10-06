const Location = require('../models/location')

module.exports = {
  async create (locationIn) {
    const location = await Location.create(locationIn)

    const res = await Location.findById(location._id).exec()
    return res.toJSON()
  },
  async getAll () {
    const res = await Location.find().exec()
    return res ? res.map(item => item.toJSON()) : []
  },
  async get (slug) {
    const res = await Location.findOne({ slug }).exec()
    return res ? res.toJSON() : null
  }
}
