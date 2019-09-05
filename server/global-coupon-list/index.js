/*
 * Description: app全球优惠列表页控制器
 * User: zhaoyiming
 * Date: 2017/9/25
*/

const express = require('express');
const router = express.Router();
const db = require('../db');

/*
* 国家与地区列表
*/
router.post('/countryList', (req, res) => {
	db('select id, country_name from tour_country', (error, data) => {
		data && res.json({countryList: data});
	});
});

/*
* 优惠券分类列表
*/
router.post('/classifyList', (req, res) => {
	db('select id, classify_name from tour_classify', (error, data) => {
		data && res.json({classifyList: data});
	});
});

/*
* 展示地区和对应类别的优惠券
*/

router.post('/showCoupons', (req, res) => {
	let data = req.body,
		countryId = data.countryId,
		classifyId = data.classifyId,
		currentPage = data.currentPage;

	if (parseInt(countryId, 10) === 1) {
		db('select id, coupon_name, coupon_explain, coupon_ico_path, coupon_status, coupon_recived_num from tour_coupon where coupon_classify="'+ classifyId +'" limit '+ (currentPage-1)*10 +', 10', (error, data) => {
			data && res.json({couponList: data});
		});
	} else {
		db('select id, coupon_name, coupon_explain, coupon_ico_path, coupon_status, coupon_recived_num from tour_coupon where coupon_belong_country="'+ countryId +'" and coupon_classify="'+ classifyId +'" limit '+ (currentPage-1)*10 +', 10', (error, data) => {
			data && res.json({couponList: data});
		});
	}
});

module.exports = router;