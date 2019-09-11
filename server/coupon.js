/**
 * 优惠券相关
 * @author: zhaoyiming
 * @since:  2017/9/29
 * @update: 2019/9/14
 */

const express = require('express');
const router = express.Router();
const db = require('./db');

/**
 * 获取用户已经领取的优惠券
 */
router.get('/record', async (req, res) => {
  try {
    const { userId } = req.query;
    const data = await db('select count(coupon_name) as num, coupon_type from tour_coupon where id in (select coupon_id from tour_coupon_user where user_id="' + userId + '") group by coupon_type');
    res.json({ code: 0, data, message: '' });
  } catch (e) {
    res.json({ code: -1, data: null, message: e });
  }
});

/**
 * 获取优惠券详情
 */
router.get('/detail', async (req, res) => {
  try {
    const { id } = req.query;
    const [data] = await db('select a.coupon_name, a.coupon_explain, a.coupon_starttime, a.coupon_endtime, a.coupon_ico_path, b.comment_content, b.comment_star, b.comment_user_phone from tour_coupon as a left join tour_comment as b on a.id=b.comment_coupon_id where a.id="' + id + '"');
    if (data) {
      res.json({ code: 0, data, message: '' });
    } else {
      res.json({ code: -1, data: null, message: '没有查询到优惠券信息' });
    }
  } catch (e) {
    res.json({ code: -1, data: null, message: e });
  }
});

/*
* 立即获取优惠券
*/
router.post('/receive', async (req, res) => {
  try {
    const { coupon_id, user_id } = req.body;
    const [id] = await db('select id from tour_coupon_user where coupon_id="' + coupon_id + '" and user_id="' + user_id + '"');
    if (id) {
      res.json({ code: -1, data: null, message: '已经领取过了' });
    } else {
      const { insertId } = await db('insert into tour_coupon_user set coupon_id="' + coupon_id + '", user_id="' + user_id + '"');
      if (insertId) {
        const data = await db('update tour_coupon set coupon_recived_num=coupon_recived_num+1 where id="' + coupon_id + '"');
        if (data) {
          res.json({ code: 0, data: 1, message: '领取成功' });
        } else {
          res.json({ code: -1, data: 0, message: '领取失败，请重新操作' });
        }
      }
    }
  } catch (e) {
    res.json({ code: -1, data: null, message: e });
  }
});

/**
 * 评论
 */
router.post('/comment', async (req, res) => {
  const { id, phone, starGrade, commentContent, couponId } = req.body;
	let addComment = null;
  let changeStatus = null;

  // 按照一般的逻辑：用户购买或使用产品之后才能进行评论；
	// 这里的优惠券暂时没有判断什么时候就算使用了，所以测试执行以下逻辑：
	// 用户发表评论这个【动作】即是【使用】优惠券，优惠券使用完之后不能再次使用
  // 线上的项目，这块儿的逻辑可以修改下
  const [item] = await db('select status from tour_coupon_user where coupon_id="'+ couponId +'" and user_id="'+ id +'"');
  if (item && item.status === 0) {
    const interdedId = await db('insert into tour_comment set comment_user_phone="'+ phone +'", comment_star="'+ starGrade +'", comment_content="'+ commentContent +'", comment_time="'+ new Date().getTime() +'", comment_coupon_id="'+ couponId +'"');
    const res = await db('update tour_coupon_user set status=1 where coupon_id="'+ couponId +'" and user_id="'+ id +'"');
    res.json({code: 0, data: {interdedId, res}, message: ''});
  } else {
    res.json({code: 0, data: status, message: ''});
  }
  
});

module.exports = router;