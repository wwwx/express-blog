const express = require('express')
const router = express.Router()
const { SuccessModel, ErrorModel } = require('../model/res.model')
const { login } = require('../controller/user')

router.post('/login', function (req, res, next) {
  const { username, password } = req.body
  //   console.log('user: ', username, password)
  const result = login(username, password)

  return result.then((data) => {
    if (data.username) {
      req.session.username = data.username
      req.session.realname = data.realname

      console.log('login: ', req.session)

      res.json(new SuccessModel())

      return
    }

    res.json(new ErrorModel('Login failed'))
  })
})

router.post('/logout', function (req, res, next) {
  console.log(req.session)
  console.log('Destroying session')
  req.session.destroy()
  res.json(new SuccessModel('OK'))
})

router.get('/login-test', function (req, res, next) {
  const session = req.session
  console.log(session)
  if (session.username) {
    res.json(new SuccessModel('success'))

    return
  }

  res.json(new ErrorModel('Not logged in'))
})

router.get('/session-test', function (req, res, next) {
  const session = req.session
  console.log(session)
  if (session.viewNum == null) {
    session.viewNum = 0
  }

  session.viewNum++

  res.json({
    viewNum: session.viewNum,
  })
})

module.exports = router
