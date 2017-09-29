/**
 * Description: 个人中心控制器
 * User: zhaoyiming
 * Date: 2017/9/29
 */

const express = require('express');
const router = express.Router();
const db = require('../db');

/*
* 个人中心基本信息展示
*/
router.post('/basicMsg', (req, res) => {
	const userId = req.body.userId;
	
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
		res.json({
			personalMsg: result[0],
			couponMsg: result[1]
		});
	});
});

/*
* 查看相关优惠券
*/
router.post('/showCoupon', (req, res) => {
	const msg = req.body;
	const userId = msg.userId;
	const type = msg.type;

	db('select a.id, a.coupon_name, a.coupon_explain, a.coupon_ico_path, a.coupon_recived_num, b.status from tour_coupon as a right join tour_coupon_user as b on a.id=b.coupon_id where a.coupon_status=0 and a.coupon_type="'+ type +'" and a.id in (select coupon_id from tour_coupon_user where user_id="'+ userId +'") and b.user_id="'+ userId +'"', (error, data) => {
		data && res.json({couponList: data});
	});
});

module.exports = router;