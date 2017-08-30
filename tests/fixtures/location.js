const randomstring = require('randomstring')

module.exports = () => ({
  name: 'UFSC Trindade',
  slug: randomstring.generate(),
  description: 'Choose life',
  price: 1.50
})
