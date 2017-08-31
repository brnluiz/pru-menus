const error = require('../../../../errors')
const menuService = require('../menu-service')

module.exports = async (req, res, next) => {
  try {
    const menuId = req.params.menuId

    const menu = await menuService.get(menuId)

    res.status(200).send(menu)
    next()
  } catch (err) {
    if (err instanceof error.NotFoundError) return next(err)
    else if (err instanceof error.ValidationError) return next(err)

    return next(new error.InternalServerError(err.message, err))
  }
}
