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
		result.length
		? res.json({backInfo: '已经领取过了', backMark: 2})
		: db('insert into tour_coupon_user set coupon_id="'+ couponId +'", user_id="'+ userId +'"', (error, data) => {
			if (data.insertId) {
				db('update tour_coupon set coupon_recived_num=coupon_recived_num+1 where id="'+ couponId +'"', (error, data) => {
					data ? res.json({backInfo: '领取成功', backMark: 1}) : res.json({backInfo: '领取失败，请重新操作', backMark: 0});
				});
			}
		});
	});
});

/*
* 发布评价
*/
router.post('/publishComment', (req, res) => {
	const msg = req.body;
	const id = msg.id;
	const phone = msg.phone;
	const starGrade = msg.starGrade;
	const commentContent = msg.commentContent;
	const couponId = msg.couponId;

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
				? res.json({backInfo: '评论成功'})
				: res.json({backInfo: '发布失败，请重新操作'});
				addComment = changeStatus = null;
			});	
		} else {
			res.json({backInfo: '您已经使用过此优惠券了！'})
		}
	});
});

module.exports = router;