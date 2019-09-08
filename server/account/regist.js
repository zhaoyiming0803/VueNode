/*
 * 注册
 * @author: zhaoyiming
 * @since: 2017/9/16
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
	
	p.then((data) => {
		if (data.length >= 1) {
			res.json({
				code: 0,
				data: {},
				message: '手机号已被注册'
			});
		} else {
			db('insert into tour_user set user_phone="'+ phone +'", user_pwd="'+ pwd +'"', (error, data) => {
				if (data) {
					res.json({
						code: 1,
						message: '注册成功...'
					});
				} else {
					res.json({
						code: 2,
						message: '注册失败'
					});
				}
			});
		}
		p = null;
	});
});

module.exports = router;