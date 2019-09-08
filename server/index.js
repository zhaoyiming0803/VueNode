const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Expose-Headers, Platform, Token');
  res.header('Access-Control-Allow-Methods','PUT, POST, GET, DELETE, OPTIONS, HEAD');  
  res.header('Content-Type', 'application/json; charset=utf-8');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// 注册
app.use('/regist', require(__dirname + '/account/regist'));

//登录
app.use('/login', require(__dirname + '/account/login'));

// 找回密码
app.use('/forgetPassword', require(__dirname + '/account/forgetPassword'));

// 个人中心
app.use('/personal', require(__dirname + '/personal/index'));

// 个人资料修改
app.use('/personalEdit', require(__dirname + '/personal/personal-edit'));

// 首页
app.use('/globalCoupon', require(__dirname + '/global-coupon/index'));

// 全球优惠列表页
app.use('/globalCouponList', require(__dirname + '/global-coupon-list/index'));

// 领取优惠券
app.use('/getCoupon', require(__dirname + '/get-coupon/index'));

app.listen(8091, () => {
  console.log('express listen port 8091');
});
