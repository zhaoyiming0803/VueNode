/*
 * 领取优惠券
 * @author: zhaoyiming
 * @since: 2017/9/27
*/

const express = require('express');
const router = express.Router();
const db = require('../db');

/*
* 查询优惠券详情
*/
router.get('/couponDetail', async (req, res) => {
	const couponId = req.query.id;

	let couponDetail = new Promise((resolve, reject) => {
		db('select a.coupon_name, a.coupon_explain, a.coupon_starttime, a.coupon_endtime, a.coupon_ico_path, b.comment_content, b.comment_star, b.comment_user_phone from tour_coupon as a left join tour_comment as b on a.id=b.comment_coupon_id where a.id="'+ couponId +'"', (error, data) => {
			data ? resolve(data) : reject(error);
		});
	});

	couponDetail
		.then(data => {
			if (data.length) {
				res.json({
					code: 0,
					data,
					message: ''
				});
			} else {
				res.json({
					code: 0,
					data: null,
					message: '优惠券获取失败，请刷新'
				});
			}
		})
		.catch(error => {
			res.json({
				code: 0,
				data: null,
				message: '优惠券获取失败，请刷新'
			});
		});
});

/*
* 立即获取优惠券
*/
router.get('/getCoupon', (req, res) => {
	const { coupon_id, user_id } = req.query;

	const validateCoupon = new Promise((resolve, reject) => {
		db('select id from tour_coupon_user where coupon_id="'+ coupon_id +'" and user_id="'+ user_id +'"', (error, data) => {
			data ? resolve(data) : reject(error);
		});
	});

	validateCoupon.then(result => {
		if (result.length) {
			res.json({ code: -1, data: null, message: '已经领取过了' });
		} else {
			db('insert into tour_coupon_user set coupon_id="'+ coupon_id +'", user_id="'+ user_id +'"', (error, data) => {
				if (data.insertId) {
					db('update tour_coupon set coupon_recived_num=coupon_recived_num+1 where id="'+ coupon_id +'"', (error, data) => {
						if (data) {
							res.json({ code: 0, data: 1, message: '领取成功' });
						} else {
							res.json({ code: -1, data: 0, message: '领取失败，请重新操作' });
						}
					});
				}
			});
		}
	});
});

/*
* 发布评价
*/
router.post('/publishComment', (req, res) => {
	const { id, phone, starGrade, commentContent, couponId } = req.body;
	let addComment = null;
	let changeStatus = null;

	// 按照一般的逻辑：用户购买或使用产品之后才能进行评论；
	// 这里的优惠券暂时没有判断什么时候就算使用了，所以测试执行以下逻辑：
	// 用户发表评论这个【动作】即是【使用】优惠券，优惠券使用完之后不能再次使用
	// 线上的项目，这块儿的逻辑可以修改下

	db('select status from tour_coupon_user where coupon_id="'+ couponId +'" and user_id="'+ id +'"', (error, data) => {
		if (data && data[0].status==0) {
			addComment = new Promise((resolve, reject) => {
				db('insert into tour_comment set comment_user_phone="'+ phone +'", comment_star="'+ starGrade +'", comment_content="'+ commentContent +'", comment_time="'+ new Date().getTime() +'", comment_coupon_id="'+ couponId +'"', (error, data) => {
					data ? resolve(data) : reject(error);
				});
			});

			changeStatus = new Promise((resolve, reject) => {
				db('update tour_coupon_user set status=1 where coupon_id="'+ couponId +'" and user_id="'+ id +'"', (error, data) => {
					data ? resolve(data) : reject(error);
				});
			});

			Promise.all([addComment, changeStatus]).then((result) => {
				(result[0] && result[1])
					? res.json({ code: 0, data: null, message: '评论成功' })
					: res.json({ code: -1, data: null, message: '发布失败，请重新操作' });
				addComment = changeStatus = null;
			});	
		} else {
			res.json({ code: 0, data: null, message: '您已经使用过此优惠券了！' })
		}
	});
});

module.exports = router;