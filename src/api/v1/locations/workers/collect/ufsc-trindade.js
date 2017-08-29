const cheerio = require('cheerio')
const request = require('request-promise-native')
const moment = require('moment')

const menuService = require('../../../menus/menu-service')

const worker = async (location) => {
  if (!location.id) throw new Error('Location id is not defined')

  const data = await request.get('http://ru.ufsc.br/ru/')

  // Loads the HTML to the Cherrio lib
  const $ = cheerio.load(data)

  // First things first: define the start and end date of this menu
  const dateEl = $('p > span:first-child').text() // It is mutable :\
  const dateRange = dateEl.match(/([0-9]*)\/([0-9]*)/g)
  const startDateStr = dateRange[0]

  // Get the start date Date object
  const startDate = moment(startDateStr, 'DD/MM')

  // Get the menu's table and iterate over it
  const rows = $($('table > tbody')[0]).find('tr').toArray()
  const menus = rows.map((row, index) => {
    if (index === 0) return // Jump header

    const items = $(row).find('td')
      .toArray().slice(1) // Jump side-header
      .map(column => $(column).text().trim())

    const menu = {
      date: moment(startDate).add(index - 1, 'day').utc().toDate(),
      items,
      locationId: location.id
    }

    return menu
  }).filter(menu => menu)

  return menuService.createBulk(menus)
}

module.exports.run = worker
