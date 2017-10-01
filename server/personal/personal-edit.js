/*
 * Description: 个人资料修改控制器
 * User: zhaoyiming
 * Date: 2017/10/1
*/

const express = require('express');
const router = express.Router();
const db = require('../db');

/*
* 获取用户基本信息
*/
router.post('/getMsg', (req, res) => {
	const msg = req.body;
	const userId = msg.userId;
	db('select user_name, user_sex from tour_user where id="'+ userId +'"', (error, data) => {
		data && res.json({backInfo: data});
	});
});

/*
* 修改头像
*/
router.post('/changeUserHeadpic', (req, res) => {
	console.log(req.files);
});

/*
* 修改用户名
*/
router.post('/changeUserName', (req, res) => {
	const msg = req.body;
	const userId = msg.userId;
	const userName = msg.userName;
	db('update tour_user set user_name="'+ userName +'" where id="'+ userId +'"', (error, data) => {
		data && res.json({backInfo: '修改成功'});
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
		data && res.json({backInfo: '修改成功'});
	});
});

module.exports = router;