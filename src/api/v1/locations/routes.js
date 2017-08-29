const router = require('express').Router()

const collectPostController = require('./controllers/locations-collect-post-controller')
const collectPostByLocationController = require('./controllers/locations-collect-post-by-location-controller')

router.post('/locations/collect',
  collectPostController
)

router.post('/locations/:locationSlug/collect',
  collectPostByLocationController
)

module.exports = router
