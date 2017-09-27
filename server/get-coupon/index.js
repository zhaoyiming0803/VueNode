/*
 * Description: 领取优惠券控制器
 * User: zhaoyiming
 * Date: 2017/9/27
*/

const express = require('express');
const router = express.Router();
const db = require('../db');

/*
* 查询优惠券详情
*/

router.post('/couponDetail', (req, res) => {
	const couponId = req.body.couponId;

	console.log(couponId);

	let couponDetail = new Promise((resolve, reject) => {
		db('select coupon_name, coupon_explain, coupon_starttime, coupon_endtime, coupon_ico_path from tour_coupon where id="'+ couponId +'"', (error, data) => {
			data ? resolve(data) : reject(error);
		});
	});

	couponDetail.then((data) => {
		if (data.length) {
			res.json({
				couponDetail: data
			});
		}
	});
});

module.exports = router;