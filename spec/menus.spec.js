const test = require('ava')

const auth = require('../configs').tests.auth
const database = require('../tests/support/database')
const fixtures = require('../tests/fixtures')
const locationRepository = require('../src/db/repositories/location-repository')
const menuRepository = require('../src/db/repositories/menu-repository')
const request = require('../tests/support/supertest')

const location = fixtures.location()
const menu = fixtures.menu(location.slug)

test.before(async t => {
  await database.init()
  await locationRepository.create(location)
  await menuRepository.create(menu)
})

test('should get a menu from a location', t =>
  request
    .get(`/locations/${menu.location.slug}/menus`)
    .auth(auth.user, auth.pswd)
    .set('Accept', 'application/json')
    .expect(200)
    .then(res => {
      const result = res.body.map(menu => {
        delete menu.createdAt
        delete menu.updatedAt
        return menu
      })

      const expected = [ fixtures.menu() ]
      expected[0].locationId = expected[0].location.id
      delete expected[0].location

      t.deepEquals(result, expected)
    })
)

test('should fail on get a menu from a non-existent location', t =>
  request
    .get(`/locations/KLAPAUCIUS/menus`)
    .auth(auth.user, auth.pswd)
    .set('Accept', 'application/json')
    .expect(404)
    .then(res => {
      t.deepEquals(res.body, { error: 'Location not found' })
    })
)

test('should get a specific menu', t =>
  request
    .get(`/menus/${menu.id}`)
    .auth(auth.user, auth.pswd)
    .set('Accept', 'application/json')
    .expect(200)
    .then(res => {
      const result = res.body
      delete result.createdAt
      delete result.updatedAt

      const expected = fixtures.menu()
      expected.locationId = expected.location.id
      delete expected.location

      t.deepEquals(result, expected)
    })
)

test('should fail on get a non-existent menu', t =>
  request
    .get(`/menus/10`)
    .auth(auth.user, auth.pswd)
    .set('Accept', 'application/json')
    .expect(404)
    .then(res => {
      t.deepEquals(res.body, { error: 'Menu not found' })
    })
)

test('should get a menu from a location on a specific date', t =>
  request
    .get(`/locations/${menu.location.slug}/menus`)
    .auth(auth.user, auth.pswd)
    .query({
      date: menu.date
    })
    .set('Accept', 'application/json')
    .expect(200)
    .then(res => {
      const result = res.body.map(menu => {
        delete menu.createdAt
        delete menu.updatedAt
        return menu
      })

      const expected = [ fixtures.menu() ]
      expected[0].locationId = expected[0].location.id
      delete expected[0].location

      t.deepEquals(result, expected)
    })
)
