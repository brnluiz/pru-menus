const router = require('express').Router()

const getController = require('./controllers/menu-get-controller')
const getByLocationController = require('./controllers/menu-get-by-location-middleware')

/**
 * @api {post} /menus Get menu (by id)
 * @apiGroup Menu
 * @apiVersion 1.0.0
 *
 * @apiSuccess Success Returns menu
 * @apiUse NotFoundError
 * @apiUse InternalServerError
 */
router.get('/menus/:menuId',
  getController
)

/**
 * @api {post} /locations/:locationSlug/menus Get menu (by location)
 * @apiGroup Menu
 * @apiVersion 1.0.0
 *
 * @apiSuccess Success Returns menus
 * @apiUse NotFoundError
 * @apiUse InternalServerError
 */
router.get('/locations/:locationSlug/menus',
  getByLocationController
)

module.exports = router
