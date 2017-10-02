const router = require('express').Router()

const locationPostController = require('./controllers/location-post-controller')
const collectPostController = require('./controllers/locations-collect-post-controller')
const collectPostByLocationController = require('./controllers/locations-collect-post-by-location-controller')

const locationMiddleware = require('./middlewares/location-middleware')

/**
 * @api {post} /locations Create Location
 * @apiGroup Locations
 * @apiVersion 1.0.0
 *
 * @apiSuccess Success
 * @apiUse InternalServerError
 * @apiUse LocationSchema
 * @apiUse LocationExample
 */
router.post('/locations',
  locationMiddleware,
  locationPostController
)

/**
 * @api {post} /locations/collect Scrap menus (all locations)
 * @apiGroup Locations
 * @apiVersion 1.0.0
 *
 * @apiSuccess Success
 * @apiUse InternalServerError
 * @apiUse NotFoundError
 * @apiUse ValidationError
 */
router.post('/locations/collect',
  collectPostController
)

/**
 * @api {post} /locations/:locationId/collect Scrap menu
 * @apiGroup Locations
 * @apiVersion 1.0.0
 *
 * @apiSuccess Success
 * @apiUse InternalServerError
 * @apiUse NotFoundError
 * @apiUse ValidationError
 */
router.post('/locations/:locationSlug/collect',
  collectPostByLocationController
)

module.exports = router
