/*
 * Description: 登录
 * User: zhaoyiming
 * Date: 2017/9/16
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
	
	// 0:用户不存在		1:登录成功		2:登录失败
	p.then((data) => {
		const len = data.length;
		if (len === 0) {
			res.json({
                backInfo: '0'
            });
		} else if (len === 1) {
			res.json({
				backInfo: '1',
				id: data[0].id,
				name: data[0].name,
				phone: phone
			});
		} else {
			res.json({
				backInfo: '2'
			});
		}
	});
});

module.exports = router;