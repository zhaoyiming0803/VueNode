/**
 * 个人中心
 * @author: zhaoyiming
 * @since: 2017/9/29
 */

const express = require('express');
const router = express.Router();
const db = require('../db');

/*
* 个人中心基本信息展示
*/
router.post('/basicInfo', (req, res) => {
	const userId = req.query.id;
	
	// 用户信息
	let personalMsg = new Promise((resolve, reject) => {
		db('select user_headpic from tour_user where id="'+ userId +'"', (error, data) => {
			data ? resolve(data) : reject(error);
		});
	});
	
	// 领取的优惠券
	let couponMsg = new Promise((resolve, reject) => {
		db('select count(coupon_name) as num, coupon_type from tour_coupon where id in (select coupon_id from tour_coupon_user where user_id="'+ userId +'") group by coupon_type', (error, data) => {
			data ? resolve(data) : reject(error);
		});
	});

	Promise.all([personalMsg, couponMsg]).then((result) => {
		const [personalMsg, couponMsg] = result;
		res.json({
			code: 0,
			data: {
				personalMsg,
				couponMsg
			},
			message: ''
		});
	});
});

/*
* 查看相关优惠券
*/
router.get('/showCoupon', (req, res) => {
	const { user_id, type } = req.query;

	db('select a.id, a.coupon_name, a.coupon_explain, a.coupon_ico_path, a.coupon_recived_num, b.status from tour_coupon as a right join tour_coupon_user as b on a.id=b.coupon_id where a.coupon_status=0 and a.coupon_type="'+ type +'" and a.id in (select coupon_id from tour_coupon_user where user_id="'+ user_id +'") and b.user_id="'+ user_id +'"', (error, data) => {
		if (data) {
			res.json({ code: 0, data, message: '' });
		} else {
			res.json({ code: -1, data: null, message: '优惠券信息获取失败，请重新操作' });
		}
	});
});

module.exports = router;