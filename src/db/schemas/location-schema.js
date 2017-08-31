const Joi = require('joi')

/**
 * @apiDefine LocationSchema
 *
 * @apiParam {String} name Restaurant's name
 * @apiParam {String} [slug] Restaurant slug
 * @apiParam {String} [description] Description
 * @apiParam {Number} price Price
 */
module.exports = Joi.object().keys({
  name: Joi.string().required(),
  slug: Joi.string(),
  description: Joi.string(),
  price: Joi.number(),
  updatedAt: Joi.date().forbidden(),
  createdAt: Joi.date().forbidden()
})

/**
 * @apiDefine LocationExample
 * @apiExample {json} Location example:
  {
    "name": "UFSC Trindade",
    "slug": "ufsc-trindade",
    "description": "Choose life",
    "price": 1.50
  }
 */
