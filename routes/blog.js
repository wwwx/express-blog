const express = require('express')
const router = express.Router()
const { SuccessModel, ErrorModel } = require('../model/res.model')
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBLog,
} = require('../controller/blog')
const loginCheck = require('../midware/login-check')

router.get('/list', (req, res, next) => {
  let author = req.query.author || ''
  let keword = req.query.keyword || ''

  if (req.query.isAdmin) {
    if (req.session.username === null) {
      res.json(new ErrorModel('Not logged in'))

      return
    }
    author = req.session.username
  }

  const result = getList(author, keword)

  result.then((listData) => {
    res.json(new SuccessModel(listData))
  })
})

router.get('/detail', (req, res, next) => {
  const result = getDetail(req.query.id)
  result.then((detailData) => {
    res.json(new SuccessModel(detailData))
  })
})

router.post('/new', loginCheck, (req, res, next) => {
  req.body.author = req.session.username
  const result = newBlog(req.body)
  result.then((data) => {
    res.json(new SuccessModel(data))
  })
})

router.post('/edit', loginCheck, (req, res, next) => {
  const result = updateBlog(req.body)
  //   console.log('req.query.id is ', req.query.id)
  result.then((data) => {
    if (data) {
      res.json(new SuccessModel())
    }
    res.json(new ErrorModel('edit in error'))
  })
})

router.post('/del', loginCheck, (req, res, next) => {
  const author = req.session.username
  const result = delBLog(req.query.id, author)

  result.then((data) => {
    if (data) {
      res.json(new SuccessModel())
    }
    res.json(new ErrorModel('delete in error'))
  })
})

module.exports = router
