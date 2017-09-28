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

	let couponDetail = new Promise((resolve, reject) => {
		db('select a.coupon_name, a.coupon_explain, a.coupon_starttime, a.coupon_endtime, a.coupon_ico_path, b.comment_content, b.comment_star, b.comment_user_phone from tour_coupon as a left join tour_comment as b on a.id=b.comment_coupon_id where a.id="'+ couponId +'"', (error, data) => {
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