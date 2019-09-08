/*
 * 找回密码
 * @author: zhaoyiming
 * @since: 2017/9/17
*/

const express = require('express');
const router = express.Router();
const db = require('../db');
const crypto = require('crypto');

/*
* 找回密码第一步
*/
router.post('/getPhoneCode', (req, res) => {
	const msg = req.body;
	const phone = msg.phone;

	let p = new Promise((resolve, reject) => {
		db('select id from tour_user where user_phone="'+ phone +'"', (error, data) => {
			data ? resolve(data) : reject(error);
		});
	});

	p.then((data) => {
		if (data.length !== 1) {
			res.json({
				code: -1,
				data: null,
				message: '手机号码不存在'
			});
		} else {
			// ...模拟一系列获取短信验证码接口的代码
			let code = '';
			for (let i = 0; i < 6; i += 1) {
				code += Math.floor(Math.random() * 10);
			}
			res.json({
				code: 0,
				data: code,
				message: ''
			});
		}
	});
});

/*
* 找回密码第二步
*/
router.post('/resetPassword', (req, res) => {
	const md5 = crypto.createHash('md5');
	const msg = req.body;
	const phone = msg.phone;
	const pwd = md5.update(msg.pwd).digest('hex');

	db('update tour_user set user_pwd="'+ pwd +'" where user_phone="'+ phone +'"', (error, data) => {
		if (data) {
			res.json({
				code: 0,
				data: null,
				message: ''
			});
		} else {
			res.json({
				code: -1,
				data: null,
				message: '密码重置失败，请重新操作'
			});
		}
	});
});

module.exports = router;