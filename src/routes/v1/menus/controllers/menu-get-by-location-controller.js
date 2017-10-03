const error = require('../../../../errors')
const menuService = require('../../../../services/menu-service')

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
    if (err instanceof error.NotFoundError) return next(err)
    else if (err instanceof error.ValidationError) return next(err)

    return next(new error.InternalServerError(err.message, err))
  }
}
