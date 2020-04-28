const { ErrorModel } = require('../model/res.model')

module.exports = (req, res, next) => {
  if (req.session.username) {
    next()
    return
  }

  res.json(new ErrorModel('Not logged in'))
}
