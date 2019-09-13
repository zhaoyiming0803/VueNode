const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Expose-Headers, Platform, Token');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, HEAD');
  res.header('Content-Type', 'application/json; charset=utf-8');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', require(__dirname + '/module/auth'));
app.use('/user', require(__dirname + '/module/user'));
app.use('/coupon', require(__dirname + '/module/coupon'));
app.use('/region', require(__dirname + '/module/region'));
app.use('/banner', require(__dirname + '/module/banner'));
app.use('/article', require(__dirname + '/module/article'));
app.use('/comment', require(__dirname + '/module/comment'));

app.listen(8091, () => {
  console.log('express listen port 8091');
});
