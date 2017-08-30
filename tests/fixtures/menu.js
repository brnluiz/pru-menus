const moment = require('moment')

module.exports = (locationId = null) => ({
  items: [
    'Fish and Chips',
    'Gelato'
  ],
  date: moment().format('YYYY-MM-DD'),
  locationId
})
