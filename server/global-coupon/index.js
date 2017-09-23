/*
 * Description: app首页控制器
 * User: zhaoyiming
 * Date: 2017/9/19
*/

const express = require('express');
const router = express.Router();
const db = require('../db');

let bannerData = null;
let hotCoupon = null;

/*
* 查询首页数据公用方法
*/
let getData = (countryId = 1) => {

	// 查询banner
	bannerData = new Promise((resolve, reject) => {
		db('select banner_path from tour_banner where banner_belong_country=' + countryId, (error, data) => {
			data ? resolve(data) : reject(error);
		});
	});

	// 查询热门优惠
	hotCoupon = new Promise((resolve, reject) => {
		db('select coupon_name, coupon_explain, coupon_ico_path from tour_coupon where coupon_belong_country="'+countryId+'" limit 0, 4', (error, data) => {
			data ? resolve(data) : reject(error);
		});
	});

	// 查询购物信息

	// 查询退税信息

};

/*
* 展示所有的国家和地区
*/
router.post('/countryList', (req, res) => {
	let countryList = new Promise((resolve, reject) => {
		db('select id, country_name from tour_country', (error, data) => {
			data ? resolve(data) : reject(error);
		});
	});

	countryList.then((result) => {
		res.json({
			countryList: result
		});
	});
});

/*
* 根据对应的国家和地区ID，返回具体数据
*/
router.post('/chooseCountry', (req, res) => {
	let countryId = req.body.countryId;

	getData(countryId);

	Promise.all([bannerData, hotCoupon]).then((result) => {
		res.json({
			bannerData: result[0],
			hotCoupon: result[1]
		});
		bannerData = hotCoupon = result = null;
	});	
});

module.exports = router;