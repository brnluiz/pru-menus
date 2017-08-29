const menuService = require('../menu-service')

module.exports = async (req, res, next) => {
  try {
    const locationSlug = req.params.locationSlug
    const startDate = req.query.date || req.query.startDate
    const endDate = req.query.endDate

    const menus = await menuService
      .getByLocation(locationSlug, startDate, endDate)

    res.status(200).send(menus)
    next()
  } catch (err) {
    return next(err)
  }
}
