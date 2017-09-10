const test = require('ava')

const auth = require('../configs').tests.auth
const database = require('../tests/support/database')
const fixtures = require('../tests/fixtures')
const request = require('../tests/support/supertest')

const location = fixtures.location()

test.before(async t => {
  await database.init()
})

test('should create a location', t =>
  request
    .post('/v1/locations')
    .auth(auth.user, auth.pswd)
    .set('Accept', 'application/json')
    .send(location)
    .expect(201)
    .then(res => {
      t.deepEqual(res.body, {})
    })
)

test('should fail on create location', t =>
  request
    .post('/v1/locations')
    .auth(auth.user, auth.pswd)
    .set('Accept', 'application/json')
    .send({})
    .expect(400)
    .then(res => {
      t.deepEqual(res.body.message, 'child "name" fails because ["name" is required]')
    })
)

test('should create a collection request for all locations', t =>
  request
    .post('/v1/locations/collect')
    .auth(auth.user, auth.pswd)
    .set('Accept', 'application/json')
    .expect(201)
    .then(res => {
      t.deepEqual(res.body, {})
    })
)

test('should execute a location collect', t =>
  request
    .post(`/v1/locations/${location.slug}/collect`)
    .auth(auth.user, auth.pswd)
    .set('Accept', 'application/json')
    .expect(201)
    .then(res => {
      t.deepEqual(res.body, {})
    })
)

test('should fail on execute a location collect due to non-existent location', t =>
  request
    .post(`/v1/locations/KLAPAUCIUS/collect`)
    .auth(auth.user, auth.pswd)
    .set('Accept', 'application/json')
    .expect(404)
    .then(res => {
      t.deepEqual(res.body, {
        error: 'Location not found',
        type: 'NotFoundError'
      })
    })
)
