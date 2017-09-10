const router = require('express').Router()

const locationPostController = require('./controllers/location-post-controller')
const collectPostController = require('./controllers/locations-collect-post-controller')
const collectPostByLocationController = require('./controllers/locations-collect-post-by-location-controller')

const locationMiddleware = require('./middlewares/location-middleware')

router.post('/locations',
  locationMiddleware,
  locationPostController
)

router.post('/locations/collect',
  collectPostController
)

router.post('/locations/:locationSlug/collect',
  collectPostByLocationController
)

module.exports = router
