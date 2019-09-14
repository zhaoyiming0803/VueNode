/**
 * 优惠券相关
 * @author: zhaoyiming
 * @since:  2017/9/29
 * @update: 2019/9/14
 */

const express = require('express');
const router = express.Router();
const db = require('../helper/db');

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
 * 获取用户已经领取的具体某一个优惠券列表
 */
router.get('/received', async (req, res) => {
  try {
    const { userId, type } = req.query;
    const receivedCouponList = await db('select a.id, a.coupon_name, a.coupon_explain, a.coupon_ico_path, a.coupon_recived_num, b.status from tour_coupon as a right join tour_coupon_user as b on a.id=b.coupon_id where a.coupon_status=0 and a.coupon_type="' + type + '" and a.id in (select coupon_id from tour_coupon_user where user_id="' + userId + '") and b.user_id="' + userId + '"');
    res.json({ code: 0, data: receivedCouponList, message: '' });
  } catch (e) {
    res.json({ code: -1, data: null, message: '获取失败' });
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
    const { couponId, userId } = req.body;
    const [id] = await db('select id from tour_coupon_user where coupon_id="' + couponId + '" and user_id="' + userId + '"');
    if (id) {
      res.json({ code: -1, data: 2, message: '已经领取过了' });
    } else {
      const { insertId } = await db('insert into tour_coupon_user set coupon_id="' + couponId + '", user_id="' + userId + '"');
      if (insertId) {
        const data = await db('update tour_coupon set coupon_recived_num=coupon_recived_num+1 where id="' + couponId + '"');
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

router.get('/hot', async (req, res) => {
  const { regionId } = req.query;
  const getTime = Date.now();
  const $limit = 'limit 0, 4';
  const $belong = 'coupon_belong_region="' + regionId + '"';
  const $query = 'select id, coupon_name, coupon_explain, coupon_ico_path from tour_coupon ' + regionId === 1
    ? $limit
    : 'where "' + getTime + '" < coupon_endtime and ' + $belong + ' ' + $limit
  try {
    const hotCouponList = await db($query + ' ' + $limit);
    res.json({ code: 0, data: hotCouponList, message: '' });
  } catch (e) {
    res.json({ code: -1, data: [], message: e });
  }
});

/**
 * 优惠券分类列表
 */
router.get('/classify', async (req, res) => {
  try {
    const classifyList = await db('select id, classify_name from tour_classify');
    res.json({ code: 0, data: classifyList, message: '' });
  } catch (e) {
    res.json({ code: -1, data: [], message: e });
  }
});

/**
 * 首页展示地区和对应类别的优惠券
 */
router.get('/home', async (req, res) => {
  try {
    const { regionId, classifyId, page } = req.query;
    const couponList = regionId - 0 === 1
      ? await db('select id, coupon_name, coupon_explain, coupon_ico_path, coupon_status, coupon_recived_num from tour_coupon where coupon_classify="' + classifyId + '" limit ' + (page - 1) * 10 + ', 10')
      : await db('select id, coupon_name, coupon_explain, coupon_ico_path, coupon_status, coupon_recived_num from tour_coupon where coupon_belong_region="' + regionId + '" and coupon_classify="' + classifyId + '" limit ' + (page - 1) * 10 + ', 10');
    res.json({ code: 0, data: couponList, message: '' });
  } catch (e) {
    res.json({ code: -1, data: [], message: JSON.stringify(e) });
  }
});

module.exports = router;