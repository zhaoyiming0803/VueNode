/**
 * Description: server路由
 * User: zhaoyiming
 * Date: 2017/9/16
 */

var express = require('express');
var router = express.Router();

// 注册
router.use('/regist', require(__dirname + '/account/registAction'));

//登录
router.use('/login', require(__dirname + '/account/loginAction'));

// 找回密码
router.use('/forgetPwd', require(__dirname + '/account/forgetPwdAction'));

// 首页
router.use('/globalCoupon', require(__dirname + '/global-coupon/index'));

module.exports = router;