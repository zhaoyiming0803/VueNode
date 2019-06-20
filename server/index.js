/**
 * Description: server路由
 * User: zhaoyiming
 * Date: 2017/9/16
 */

var express = require('express');
var router = express.Router();
var app = express();

// 注册
router.use('/api/regist', require(__dirname + '/account/regist'));

//登录
router.use('/api/login', require(__dirname + '/account/login'));

// 找回密码
router.use('/api/forgetPwd', require(__dirname + '/account/forgetPwd'));

// 个人中心
router.use('/api/personal', require(__dirname + '/personal/index'));

// 个人资料修改
router.use('/api/personalEdit', require(__dirname + '/personal/personal-edit'));

// 首页
router.use('/api/globalCoupon', require(__dirname + '/global-coupon/index'));

// 全球优惠列表页
router.use('/api/globalCouponList', require(__dirname + '/global-coupon-list/index'));

// 领取优惠券
router.use('/api/getCoupon', require(__dirname + '/get-coupon/index'));

app.use(router);

console.log('listen on 8000');
app.listen(8000);