/**
 * Banner
 * @author: zhaoyiming
 * @since:  2017/9/29
 */

const express = require('express')
const router = express.Router()
const db = require('../helper/db')

router.get('/get', async (req, res) => {
  try {
    const { couponId } = req.query
    const commentList = await db(
      'select comment_user_phone, comment_star, comment_content from tour_comment where comment_coupon_id=' +
        couponId
    )
    res.json({ code: 0, data: commentList, message: '' })
  } catch (e) {
    res.json({
      code: -1,
      data: [],
      message: '评论获取失败'
    })
  }
})

/**
 * 发布评论
 */
router.post('/publish', async (req, res) => {
  const { userId, starGrade, commentContent, couponId } = req.body
  if (!couponId || !userId) {
    res.json({ code: -1, data: null, message: '参数有误' })
  }

  // 按照一般的逻辑：用户购买或使用产品之后才能进行评论；
  // 这里的优惠券暂时没有判断什么时候就算使用了，所以测试执行以下逻辑：
  // 用户发表评论这个【动作】即是【使用】优惠券，优惠券使用完之后不能再次使用
  // 线上的项目，这块儿的逻辑可以修改下
  const [item] = await db(
    `select status from tour_coupon_user where coupon_id=${couponId} and user_id=${userId}`
  )
  if (!item) {
    res.json({ code: -1, data: null, message: '购买优惠券之后才能评论哦' })
  }
  if (item.status === 0) {
    const [userItem] = await db(
      'select user_phone from tour_user where id = ' + userId
    )
    if (!userItem)
      return res.json({ code: -1, data: null, message: '用户不存在' })
    await db(
      'insert into tour_comment set comment_user_phone="' +
        userItem.user_phone +
        '", comment_star="' +
        starGrade +
        '", comment_content="' +
        commentContent +
        '", comment_time="' +
        new Date().getTime() +
        '", comment_coupon_id="' +
        couponId +
        '"'
    )
    await db(
      `update tour_coupon_user set status=1 where coupon_id=${couponId} and user_id=${userId}`
    )
    res.json({ code: 0, data: null, message: '评论成功' })
  } else {
    res.json({ code: -1, data: null, message: '已经发布过评论了' })
  }
})

module.exports = router
