const test = require('ava')

const auth = require('../configs').tests.auth
const database = require('../tests/support/database')
const fixtures = require('../tests/fixtures')
const locationRepository = require('../src/db/repositories/location-repository')
const menuRepository = require('../src/db/repositories/menu-repository')
const request = require('../tests/support/supertest')

let location
let menu
test.before(async t => {
  await database.init()
  const locationIn = fixtures.location()
  location = await locationRepository.create(locationIn)

  const menuIn = fixtures.menu(location._id)
  menu = await menuRepository.create(menuIn)
  menu = JSON.parse(JSON.stringify(menu)) // FIXME: Menu.create returns mongoose model
})

test('should get a menu from a location', t =>
  request
    .get(`/v1/locations/${location.slug}/menus`)
    .auth(auth.user, auth.pswd)
    .set('Accept', 'application/json')
    .expect(200)
    .then(res => {
      const expected = [ menu ]
      t.deepEqual(res.body, expected)
    })
)

test('should fail on get a menu from a non-existent location', t =>
  request
    .get(`/v1/locations/KLAPAUCIUS/menus`)
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

test('should get a specific menu', t =>
  request
    .get(`/v1/menus/${menu._id}`)
    .auth(auth.user, auth.pswd)
    .set('Accept', 'application/json')
    .expect(200)
    .then(res => {
      t.deepEqual(res.body, menu)
    })
)

test('should fail on get a non-existent menu', t =>
  request
    .get(`/v1/menus/41224d776a326fb40f000001`)
    .auth(auth.user, auth.pswd)
    .set('Accept', 'application/json')
    .expect(404)
    .then(res => {
      t.deepEqual(res.body, {
        error: 'Menu not found',
        type: 'NotFoundError'
      })
    })
)

test('should fail on get a invalid id', t =>
  request
    .get(`/v1/menus/invalid`)
    .auth(auth.user, auth.pswd)
    .set('Accept', 'application/json')
    .expect(400)
    .then(res => {
      t.deepEqual(res.body, {
        error: 'Not a valid id',
        type: 'ValidationError'
      })
    })
)

test('should get a menu from a location on a specific date', t =>
  request
    .get(`/v1/locations/${location.slug}/menus`)
    .auth(auth.user, auth.pswd)
    .query({
      date: menu.date
    })
    .set('Accept', 'application/json')
    .expect(200)
    .then(res => {
      const expected = [ menu ]
      t.deepEqual(res.body, expected)
    })
)
