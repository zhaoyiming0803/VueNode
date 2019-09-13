/**
 * Banner
 * @author: zhaoyiming
 * @since:  2017/9/29
 * @update: 2019/9/14
 */

const express = require('express');
const router = express.Router();
const db = require('../helper/db');

router.get('/get', async (req, res) => {
  try {
    const { couponId } = req.query;
    const commentList = await db('select comment_user_phone, comment_star, comment_content from tour_comment where comment_coupon_id=' + couponId);
    res.json({ code: 0, data: commentList, message: '' });
  } catch (e) {
    res.json({
      code: -1, data: [], message: '评论获取失败'});
  }
});

/**
 * 发布评论
 */
router.post('/publish', async (req, res) => {
  const { id, phone, starGrade, commentContent, couponId } = req.body;
  if (!couponId || !id) {
    res.json({ code: -1, data: null, message: '参数有误' });
  }

  // 按照一般的逻辑：用户购买或使用产品之后才能进行评论；
  // 这里的优惠券暂时没有判断什么时候就算使用了，所以测试执行以下逻辑：
  // 用户发表评论这个【动作】即是【使用】优惠券，优惠券使用完之后不能再次使用
  // 线上的项目，这块儿的逻辑可以修改下
  const [item] = await db('select status from tour_coupon_user where coupon_id="' + couponId + '" and user_id="' + id + '"');
  if (!item) {
    const interdedId = await db('insert into tour_comment set comment_user_phone="' + phone + '", comment_star="' + starGrade + '", comment_content="' + commentContent + '", comment_time="' + new Date().getTime() + '", comment_coupon_id="' + couponId + '"');
    const result = await db('insert into tour_coupon_user set status=1 where coupon_id="' + couponId + '" and user_id="' + id + '"');
    res.json({ code: 0, data: null, message: '' });
  } else {
    res.json({ code: -1, data: null, message: '已经发布过评论了' });
  }
});

module.exports = router;