/*
 * Description: 找回密码第一步
 * User: zhaoyiming
 * Date: 2017/9/17
*/

const express = require('express');
const router = express.Router();
const db = require('../db');
const crypto = require('crypto');

/*
* 找回密码第一步
*/
router.post('/firstStep', (req, res) => {
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
                backInfo: '0'
            });
		} else {
			// ...模拟一系列获取短信验证码接口的代码
			let tmpCode = '';
			for (let i = 0; i < 6; i += 1) {
				tmpCode += Math.floor(Math.random() * 10);
			}
			res.json({
                backInfo: tmpCode
            });
		}
	});
});

/*
* 找回密码第二步
*/
router.post('/secondStep', (req, res) => {
	const md5 = crypto.createHash('md5');
	const msg = req.body;
	const phone = msg.phone;
	const pwd = md5.update(msg.pwd).digest('hex');

	db('update tour_user set user_pwd="'+ pwd +'" where user_phone="'+ phone +'"', (error, data) => {
		data ? res.json({backInfo: '1'}) : res.json({backInfo: '0'});
	});
});

module.exports = router;