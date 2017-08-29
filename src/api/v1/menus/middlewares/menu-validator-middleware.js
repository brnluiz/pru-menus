const Menu = require('../../../../schemas/menu-schema')
const errors = require('../../../../errors')

module.exports = (req, res, next) => {
  const validate = Menu.validate(req.body, { abortEarly: false })
  if (validate.error) {
    const error = new errors.ValidationError(validate.error)
    return next(error)
  }

  req.body = validate.value
  return next()
}
