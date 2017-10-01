/**
 * Description: server路由
 * User: zhaoyiming
 * Date: 2017/9/16
 */

var express = require('express');
var router = express.Router();

// 注册
router.use('/regist', require(__dirname + '/account/regist'));

//登录
router.use('/login', require(__dirname + '/account/login'));

// 找回密码
router.use('/forgetPwd', require(__dirname + '/account/forgetPwd'));

// 个人中心
router.use('/personal', require(__dirname + '/personal/index'));

// 个人资料修改
router.use('/personalEdit', require(__dirname + '/personal/personal-edit'));

// 首页
router.use('/globalCoupon', require(__dirname + '/global-coupon/index'));

// 全球优惠列表页
router.use('/globalCouponList', require(__dirname + '/global-coupon-list/index'));

// 领取优惠券
router.use('/getCoupon', require(__dirname + '/get-coupon/index'));

module.exports = router;