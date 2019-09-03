const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Expose-Headers, Platform, Token');
  res.header('Access-Control-Allow-Methods','PUT, POST, GET, DELETE, OPTIONS, HEAD');  
  res.header('Content-Type', 'application/json; charset=utf-8');
  next();
});

app.get('/api/user/info', (req, res) => {
  res.json({
    code: 0,
    data: {
      name: 'zymfe',
      age: 18
    },
    msg: ''
  });
});

app.get('/api/memu/list', (req, res) => {
  res.json({
    code: 0,
    data: [
      { 
        id: 1, 
        name: '权限管理', 
        children: [
          { id: 2, name: '菜单管理' },
          { id: 3, name: '角色管理' },
          { id: 4, name: '用户管理' }
        ] 
      },
      { 
        id: 5, 
        name: '本地生活', 
        children: [
          { id: 6, name: '商品管理' },
          { id: 7, name: '商家管理' }
        ] 
      }
    ],
    msg: ''
  });
});

console.log('app listen 8091');
app.listen(8091);