const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Expose-Headers, Platform, Token, Uid'
  )
  res.header(
    'Access-Control-Allow-Methods',
    'PUT, POST, GET, DELETE, OPTIONS, HEAD'
  )
  // res.header('Content-Type', 'application/json charset=utf-8')
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/tour/auth', require(__dirname + '/module/auth'))
app.use('/tour/user', require(__dirname + '/module/user'))
app.use('/tour/coupon', require(__dirname + '/module/coupon'))
app.use('/tour/region', require(__dirname + '/module/region'))
app.use('/tour/banner', require(__dirname + '/module/banner'))
app.use('/tour/article', require(__dirname + '/module/article'))
app.use('/tour/comment', require(__dirname + '/module/comment'))

app.listen(8091, () => {
  console.log('express listen port 8091')
})
