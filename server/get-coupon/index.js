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

/*
* 立即获取优惠券
*/
router.post('/getCoupon', (req, res) => {
	const msg = req.body;
	const couponId = msg.couponId;
	const userId = msg.userId;

	let validateCoupon = new Promise((resolve, reject) => {
		db('select id from tour_coupon_user where coupon_id="'+ couponId +'" and user_id="'+ userId +'"', (error, data) => {
			data ? resolve(data) : reject(error);
		});
	});

	validateCoupon.then((result) => {
		result.length ?
		res.json({backInfo: '已经领取过了', backMark: 2}) :
		db('insert into tour_coupon_user set coupon_id="'+ couponId +'", user_id="'+ userId +'"', (error, data) => {
			if (data.insertId) {
				db('update tour_coupon set coupon_recived_num=coupon_recived_num+1 where id="'+ couponId +'"', (error, data) => {
					data ? res.json({backInfo: '领取成功', backMark: 1}) : res.json({backInfo: '领取失败，请重新操作', backMark: 0});
				});
			}
		});
	});
});

module.exports = router;