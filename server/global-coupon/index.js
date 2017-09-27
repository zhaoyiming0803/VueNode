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
let featureArticle = null;

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
		const getTime = new Date().getTime();
		const $query = 'select id, coupon_name, coupon_explain, coupon_ico_path from tour_coupon';
		const $limit = 'limit 0, 4';
		const $belong = 'coupon_belong_country="'+ countryId +'"';
		if (countryId === 1) {
			db($query + ' ' + $limit, (error, data) => {
				data ? resolve(data) : reject(error);
			});
		} else {
			db($query + ' where "'+ getTime +'" < coupon_endtime and ' + $belong + ' ' + $limit, (error, data) => {
				data ? resolve(data) : reject(error);
			});
		}
	});

	// 专题文章
	featureArticle = new Promise((resolve, reject) => {
		const $query = 'select feature_title, feature_ico_path, feature_url, feature_classify from tour_feature';
		const $limit = 'limit 0, 4';
		if (countryId === 1) {
			db($query + ' ' + $limit, (error, data) => {
				data ? resolve(data) : reject(error);
			});
		} else {
			db($query + ' where feature_belong_country = "'+ countryId +'" ' + $limit, (error, data) => {
				data ? resolve(data) : reject(error);
			});
		}
	});
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

	getData(parseInt(countryId, 10));

	Promise.all([bannerData, hotCoupon, featureArticle]).then((result) => {
		res.json({
			bannerData: result[0],
			hotCoupon: result[1],
			featureArticle: result[2]
		});
		bannerData = hotCoupon = featureArticle = result = null;
	});	
});

module.exports = router;