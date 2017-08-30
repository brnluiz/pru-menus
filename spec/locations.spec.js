const test = require('ava')

const auth = require('../configs').tests.auth
const database = require('../tests/support/database')
const fixtures = require('../tests/fixtures')
const locationRepository = require('../src/db/repositories/location-repository')
const request = require('../tests/support/supertest')

const location = fixtures.location()

test.before(async t => {
  await database.init()
  await locationRepository.create(location)
})

test('should create a collection request for all locations', t =>
  request
    .post('/locations/collect')
    .auth(auth.user, auth.pswd)
    .set('Accept', 'application/json')
    .expect(201)
    .then(res => {
      t.is(res.body, {})
    })
)

test('should execute a location collect', t =>
  request
    .post(`/locations/${location.slug}/collect`)
    .auth(auth.user, auth.pswd)
    .set('Accept', 'application/json')
    .expect(201)
    .then(res => {
      t.is(res.body, {})
    })
)

test('should fail on execute a location collect due to non-existent location', t =>
  request
    .post(`/locations/KLAPAUCIUS/collect`)
    .auth(auth.user, auth.pswd)
    .set('Accept', 'application/json')
    .expect(404)
    .then(res => {
      t.is(res.body, { error: 'Location not found' })
    })
)
