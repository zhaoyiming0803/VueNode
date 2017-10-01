/*
 * Description: 注册
 * User: zhaoyiming
 * Date: 2017/9/16
*/

const express = require('express');
const router = express.Router();
const db = require('../db');
const crypto = require('crypto');

router.post('/registForm', (req, res) => {
	const md5 = crypto.createHash('md5');
	const registMsg = req.body;
	const phone = registMsg.phone;
	const pwd = md5.update(registMsg.pwd).digest('hex');

	let p = new Promise((resolve, reject) => {
		db('select id from tour_user where user_phone="'+ phone +'"', (error, data) => {
			data ? resolve(data) : reject(error);
		});
	});
	
	// 0:手机号已被注册		1:注册成功		2:注册失败
	p.then((data) => {
		if (data.length >= 1) {
			res.json({
                backInfo: '0'
            });
		} else {
			db('insert into tour_user set user_phone="'+ phone +'", user_pwd="'+ pwd +'"', (error, data) => {
				data ? res.json({backInfo: '1'}) : res.json({backInfo: '2'});
			});
		}
		p = null;
	});
});

module.exports = router;