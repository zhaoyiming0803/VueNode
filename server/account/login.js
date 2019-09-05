/*
 * Description: 登录
 * @author: zhaoyiming
 * @since: 2017/9/16
*/

const express = require('express');
const router = express.Router();
const db = require('../db');
const crypto = require('crypto');

router.post('/loginForm', (req, res) => {
	const md5 = crypto.createHash('md5');
	const loginMsg = req.body;
	const phone = loginMsg.phone;
	const pwd = md5.update(loginMsg.pwd).digest('hex');

	let p = new Promise((resolve, reject) => {
		db('select id,user_name from tour_user where user_phone="'+ phone +'" and user_pwd="'+pwd +'"', (error, data) => {
			data ? resolve(data) : reject(error);
		});
	});
	
	p.then((data) => {
		const len = data.length;
		if (len === 0) {
			res.json({
				code: -1,
				data: {},
				msg: '用户不存在'
			});
		} else if (len === 1) {
			res.json({
				code: 0,
				data: {
					id: data[0].id,
					name: data[0].name,
					phone: phone
				},
				msg: ''
			});
		} else {
			res.json({
				code: -1,
				data: {},
				msg: '登录失败'
			});
		}
	});
});

module.exports = router;