const Joi = require('joi')

/**
 * @apiDefine MenuSchema
 *
 * @apiParam {String[]} items Menu items
 * @apiParam {String} date Date which this menu will be available
 * @apiParam {String} locationId Restaurant ID
 */
module.exports = Joi.object().keys({
  items: Joi.array().required(),
  date: Joi.date().required(),
  locationId: Joi.string().required(),
  updatedAt: Joi.date().forbidden(),
  createdAt: Joi.date().forbidden()
})

/**
 * @apiDefine MenuExample
 * @apiExample {json} Menu example:
  {
    "items": [
      "Fish and Chips",
      "Gelato"
    ],
    "date": "2017-01-01",
    "locationId": "xyz"
  }
 */
