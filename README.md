### VueNode

[1.0版本](https://github.com/zhaoyiming0803/VueNode/tree/v1.0)的 VueNode 是 2017 年做的，单纯是为了做本地测试，所以代码看上去并不是非常舒服。所以趁着 2019 年中秋节放假，把这个项目重构了一遍。主要修改如下：

- 前端使用 TypeScript，个人感觉确实好用，因为其类型校验，在重构过程中还解决了 1.0 版本的几个潜在 Bug。

- 项目使用 Vue CLI 3 初始化，在此基础上修改了很多默认配置，更加适合当前项目，性能更优。

- 头像上传，文件上传到了七牛云 OSS，节省本地空间，并且能很好的利用 CDN 优势。

- 整理了后端接口，使用 async 和 await ，再也不用多层嵌套回调函数了。

- 新加了针对前后端部署的详细文档以及 Nginx PM2 配置。

前后端代码以数据库都已部署到腾讯云：[在线预览](https://web.0351zhuangxiu.com/tour/)

如果对 Vue 源码感兴趣，可以参考[Vue源码学习笔记](https://github.com/zhaoyiming0803/into-vue)

上一个版本，请参考[VueNode V1.0](https://github.com/zhaoyiming0803/VueNode/tree/v1.0)

#### 注：此项目纯属个人爱好及代码测试，如果需要完整的相关服务，可以去锦囊团官网。

### 技术栈

前端：HTML、CSS、Less、ES6(7|8)、Webpack4、Vue CLI 3、Vue.JS2.6.10、Vuex3.1.1、Vue Router3.1.3、Axios0.19.0

后端：Node.js、MySQL

### 项目本地运行方法

 - git clone https://github.com/zhaoyiming0803/VueNode.git

 - 前端代码在 fe 目录下，node 代码在 server 目录下，打开对应的目录，查看 package.json，npm 执行 对应的 script 即可。

### 线上部署

- 前端：参考 fe 目录下的 nginx.conf、Jenkinsfile、publish.sh

- 后端：参考 server 目录下的 nginx.conf、pm2.json、Jenkinsfile、publish.sh

### 关于数据库

 - 安装mysql数据库，新建数据库tour，然后导入全部数据（/server/tour.sql）

 - 浏览器访问：https://web.0351zhuangxiu.com/tour/ (本地host：127.0.0.1 web.0351zhuangxiu.com)

 - 数据库 tour_user 表中的用户默认密码均为123456

### 说明

如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^

或者您可以 "follow" 一下，我会不断开源更多的有趣的项目

如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍

### 个人微信&QQ：1047832475
![image](https://github.com/zhaoyiming0803/VueNode/blob/v1.0/wechat.png?raw=true)

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
