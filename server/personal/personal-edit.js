/*
 * Description: 个人资料修改控制器
 * User: zhaoyiming
 * Date: 2017/10/1
*/

const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('../multer');

/*
* 获取用户基本信息
*/
router.get('/getMsg', (req, res) => {
	const { id } = req.query;
	db('select user_name, user_sex, user_headpic from tour_user where id="'+ id +'"', (error, data) => {
		data && res.json({code: 0, data: data[0], message: 0});
	});
});

/*
* 修改头像
*/
router.post('/changeUserHeadpic', multer.array('file'), (req, res, next) => {
	const file = req.files[0];
	const userId = req.body.id;
	const filePath = 'static/uploads/images/' + file.filename;
	
	db('update tour_user set user_headpic="'+ filePath +'" where id="'+ userId +'"', (error, data) => {
		if (data) {
			// 后期要换成oss地址
			res.json({ code: 0, data: file.filename, message: 0 });
		} else {
			res.json({ code: -1, data: null, message: error });
		}
	});
});

/*
* 修改用户名
*/
router.post('/changeUserName', (req, res) => {
	const msg = req.body;
	const userId = msg.userId;
	const userName = msg.userName;
	db('update tour_user set user_name="'+ userName +'" where id="'+ userId +'"', (error, data) => {
		if (data) {
			res.json({ code: 0, data, message: '修改成功'});
		} else {
			res.json({ code: -1, data: null, message: error });
		}
	});
});

/*
* 修改性别
*/
router.post('/changeUserSex', (req, res) => {
	const msg = req.body;
	const userId = msg.userId;
	const sex = msg.sex;
	db('update tour_user set user_sex="'+ sex +'" where id="'+ userId +'"', (error, data) => {
		if (data) {
			res.json({ code: 0, data, message: '修改成功'});
		} else {
			res.json({ code: -1, data: null, message: error });
		}
	});
});

module.exports = router;