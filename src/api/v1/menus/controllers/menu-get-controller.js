const menuService = require('../menu-service')

module.exports = async (req, res, next) => {
  try {
    const menuId = req.params.menuId

    const menu = await menuService.get(menuId)

    res.status(200).send(menu)
    next()
  } catch (err) {
    next(err)
  }
}
