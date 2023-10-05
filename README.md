# VueNode

English | [简体中文](./README-zh_CN.md)

VueNode is developed using Vue3 & Node.js, and the old version can refer to:

- [VueNode v1.x](https://github.com/zhaoyiming0803/VueNode/tree/v1.0)

- [VueNode v2.x](https://github.com/zhaoyiming0803/VueNode/tree/v2.2.2)

### Replace Express with Koa.js

- https://github.com/zhaoyiming0803/test-code/blob/master/TypeORMDemoWithKoa/

### Vue upgrade guide from v2 to v3:

- [Vue Official Upgrade Guide](https://v3-migration.vuejs.org/)

- [vuex](https://next.vuex.vuejs.org/guide/)

- [vue-router](https://next.router.vuejs.org/installation.html)

- [upgrade vantUI](https://vant-contrib.gitee.io/vant/v3/#/zh-CN/migrate-from-v2)

- [vuex](https://next.vuex.vuejs.org/guide/)

- [vue-router](https://next.router.vuejs.org/installation.html)

- [test demo](https://github.com/zhaoyiming0803/vue3-webpack-demo)

- Initialize a demo using Vue official cli, confirm the latest package dependency version is, and then install the corresponding version of the dependencies in the current project.

- Temporarily comment out the routes in `fe/src/router/routes.ts`, add a new test page, and gradually migrate the original business code.

- Convert all components under `fe/src/components` to Vue 3 syntax.

- Gradually migrate `fe/src/pages`.

- Note: This project is purely a personal hobby and code testing.

### Technology Stacks

- FE：@vue/cli@4.5.13、vue.js@3.2.16、vuex@4.0.2、vue-router@4.0.11、Less、ES6(7|8)、Webpack4、axios@0.19.0

- BE：Node.js（Koa.js）、MySQL、TypeORM、class-validator

### Run project in local

 - git clone https://github.com/zhaoyiming0803/VueNode.git

 - Open directory `fe` and `server`, view package.json, use npm can execute the corresponding script.

### Production environment deployment

- FE：refer to nginx.conf、Jenkinsfile、publish.sh under directory `fe`.

- BE：refer to nginx.conf、pm2.json、Jenkinsfile、publish.sh under directory `server`.

### About SQL

 - Install MySQL database, create a new database named `tour`, and then import all data (/server/tour.sql).

 - The default password for users in the user table is 123456.

### Features

- [x] Login、Regist、Modify password（100%）
- [x] Personal page（100%）
- [x] Update profile（100%）
- [x] Home（100%）
- [x] Home - list, global coupon（100%）
- [x] Show countries and regions list（100%）
- [x] Banners, coupons belong to country or region（100%）
- [x] Claim coupons（100%）
- [x] Coupon detail（100%）
- [x] Use coupon（100%）
- [x] Publish coupon detail（100%）
- [x] Star comment component（100%）
- [x] Wechat sharing（100%）using nodejs：https://github.com/zhaoyiming0803/wechat-nodejs

### Project GIF

![gif](https://github.com/zhaoyiming0803/VueNode/blob/v1.0/project.gif?raw=true)

### Thanks

- If it is helpful to you, you can click on the `Star` or `Watch` in the upper right corner to support it. Thank you ^_^

- Alternatively, you can `follow` me and I will continue to open up more interesting projects.

- If you have any problems, please directly raise them in issues, or if you find problems and have excellent solutions, welcome PR 👍

### My Wechat & QQ：1047832475

<img src="https://github.com/zhaoyiming0803/zhaoyiming0803/raw/master/wechat.jpeg" width="200" height="200">

### Reference material

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
