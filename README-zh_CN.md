# VueNode

> 最好的学习方法是阅读书籍和官方文档，以及 GitHub 开源代码，然后编写测试代码。

简体中文 | [English](./README.md)

当前项目使用 Vue3 & Node.js 开发，旧版本可参考：

- [VueNode v1.x](https://github.com/zhaoyiming0803/VueNode/tree/v1.0)

- [VueNode v2.x](https://github.com/zhaoyiming0803/VueNode/tree/v2.2.2)

### 用 Koa.js 替换 Express 测试 demo

- https://github.com/zhaoyiming0803/test-code/blob/master/TypeORMDemoWithKoa/

### Vue 从 v2 到 v3 升级指南：

- [Vue 官方升级指南](https://v3-migration.vuejs.org/)

- [vuex](https://next.vuex.vuejs.org/guide/)

- [vue-router](https://next.router.vuejs.org/installation.html)

- [升级 vantUI](https://vant-contrib.gitee.io/vant/v3/#/zh-CN/migrate-from-v2)

- [vuex](https://next.vuex.vuejs.org/guide/)

- [vue-router](https://next.router.vuejs.org/installation.html)

- [测试 demo](https://github.com/zhaoyiming0803/vue3-webpack-demo)

- 先用 Vue 官方脚手架初始化一个测试 demo，看下最新的包依赖版本是多少，然后当前项目中也安装相应版本的依赖。

- 将 `fe/src/router/routes.ts` 中的路由都暂时注释掉，新增一个测试页面，然后采用渐进式的方式逐步迁移原有业务代码。

- 将 `fe/src/components` 下的组件都转为 Vue3 的语法。

- 逐步迁移 `fe/src/pages`。

- 注：此项目纯属个人爱好及代码测试。

### 技术栈

- 前端：@vue/cli@4.5.13、vue.js@3.2.16、vuex@4.0.2、vue-router@4.0.11、Less、ES6(7|8)、Webpack4、axios@0.19.0

- 后端：Node.js（Koa.js）、MySQL、TypeORM、class-validator

### 项目本地运行方法

 - git clone https://github.com/zhaoyiming0803/VueNode.git

 - 前端代码在 fe 目录下，node 代码在 server 目录下，打开对应的目录，查看 package.json，npm 执行 对应的 script 即可。

### 线上部署

- 前端：参考 fe 目录下的 nginx.conf、Jenkinsfile、publish.sh

- 后端：参考 server 目录下的 nginx.conf、pm2.json、Jenkinsfile、publish.sh

### 关于数据库

 - 安装 MySQL 数据库，新建数据库tour，然后导入全部数据（/server/tour.sql）

 - 数据库 tour_user 表中的用户默认密码均为 123456

### 目标功能

- [x] 登录、注册、密码修改（100%）
- [x] 个人中心信息展示、资料修改（100%）
- [x] 头像上传（100%）
- [x] app首页（100%）
- [x] app列表页——全球优惠券（100%）
- [x] 展示国家与地区列表（100%）
- [x] 每个国家与地区对应的优惠券、新闻、banner轮播图（100%）
- [x] 领取优惠券（100%）
- [x] 优惠券详情（100%）
- [x] 使用优惠券（100%）
- [x] 发布优惠券文字（100%）
- [x] 星级评价组件（100%）
- [x] 微信分享（100%）使用 nodejs 开发微信源码：https://github.com/zhaoyiming0803/wechat-nodejs

### 项目GIF图

![gif](https://github.com/zhaoyiming0803/VueNode/blob/v1.0/project.gif?raw=true)

### 说明

- 如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^

- 或者您可以 "follow" 一下，我会不断开源更多的有趣的项目

- 如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍

### 个人微信&QQ：1047832475

<img src="https://github.com/zhaoyiming0803/zhaoyiming0803/raw/master/wechat.jpeg" width="200" height="200">

### 参考资料

- https://vuejs.org/
- https://router.vuejs.org/installation.html
- https://vuex.vuejs.org/guide/
- https://koajs.com/
- https://github.com/koajs/router/blob/master/API.md
- https://www.npmjs.com/package/koa-swagger-decorator
- https://typeorm.io/
- https://www.npmjs.com/package/class-validator
- https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html
- https://pm2.keymetrics.io/docs/usage/quick-start/
- https://github.com/zhaoyiming0803/test-code/blob/master/TypeORMDemoWithKoa/