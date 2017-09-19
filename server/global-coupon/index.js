/*
 * Description: app首页控制器
 * User: zhaoyiming
 * Date: 2017/9/19
*/

const express = require('express');
const router = express.Router();
const db = require('../db');
// const crypto = require('crypto');

router.post('/index', (req, res) => {
	let p = new Promise((resolve, reject) => {
		db('select id, country_name from tour_country', (error, data) => {
			data ? resolve(data) : reject(error);
		});
	});

	p.then((data) => {
		res.json({
			backInfo: data
		});
	});
});

module.exports = router;