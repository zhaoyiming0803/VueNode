/**
 * 登录、注册相关
 * @author zhaoyiming
 * @since  2017/9/16
 */

const express = require('express')
const router = express.Router()
const db = require('../helper/db')
const crypto = require('crypto')

/**
 * 登录
 */
router.post('/loginForm', async (req, res) => {
  const md5 = crypto.createHash('md5')
  const loginMsg = req.body
  const phone = loginMsg.phone
  const pwd = md5.update(loginMsg.pwd).digest('hex')

  try {
    const result = await db(
      'select id from tour_user where user_phone="' +
        phone +
        '" and user_pwd="' +
        pwd +
        '"'
    )
    const [item] = result
    if (!item)
      res.json({ code: -1, data: null, message: '用户不存在或密码错误' })
    else res.json({ code: 0, data: item.id, message: '' })
  } catch (err) {
    res.json({ code: -1, data: null, message: '登录失败，请重新操作' })
  }
})

/**
 * 注册
 */
router.post('/registForm', async (req, res) => {
  const md5 = crypto.createHash('md5')
  const registMsg = req.body
  const phone = registMsg.phone
  const pwd = md5.update(registMsg.pwd).digest('hex')

  try {
    const result = await db(
      'select id from tour_user where user_phone="' + phone + '"'
    )
    if (result.length > 1) {
      res.json({ code: -1, data: null, message: '该手机号已被注册' })
    } else {
      const inserted = db(
        'insert into tour_user set user_phone="' +
          phone +
          '", user_pwd="' +
          pwd +
          '"'
      )
      if (inserted) res.json({ code: 0, data: null, message: '注册成功' })
      else res.json({ code: -1, data: null, message: '注册失败' })
    }
  } catch (err) {
    res.json({ code: -1, data: null, message: err })
  }
})

/**
 * 获取短信验证码
 */
router.post('/getPhoneCode', async (req, res) => {
  const msg = req.body
  const phone = msg.phone

  try {
    const [data] = await db(
      'select id from tour_user where user_phone="' + phone + '"'
    )
    if (!data) {
      res.json({ code: -1, data: null, message: '手机号码不存在' })
    } else {
      // ...模拟一系列获取短信验证码接口的代码
      let code = ''
      for (let i = 0; i < 6; i += 1) {
        code += Math.floor(Math.random() * 10)
      }
      res.json({ code: 0, data: code, message: '' })
    }
  } catch (err) {
    res.json({ code: -1, data: null, message: err })
  }
})

/**
 * 重置密码
 */
router.post('/resetPassword', async (req, res) => {
  const md5 = crypto.createHash('md5')
  const { phone, pwd } = req.body
  const _pwd = md5.update(pwd).digest('hex')

  try {
    await db(
      'update tour_user set user_pwd="' +
        _pwd +
        '" where user_phone="' +
        phone +
        '"'
    )
    res.json({ code: 0, data: null, message: '密码重置成功' })
  } catch (e) {
    res.json({ code: -1, data: null, message: e })
  }
})

module.exports = router
