/**
 * 从npm下载express文件上传使用方法
 * @author: zhaoyiming
 * @since: 2017/10/1
 */

const fs = require('fs')
const multer = require('multer')
const storage = multer.diskStorage({
  // 设置上传后文件路径。
  destination(req, file, cb) {
    const path = `${process.cwd()}/tmp/`
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path)
    }
    cb(null, path)
  },

  // 给上传文件重命名，获取添加后缀名
  filename(req, file, cb) {
    let fileFormat = file.originalname.split('.')
    cb(
      null,
      file.fieldname +
        '-' +
        Date.now() +
        '.' +
        fileFormat[fileFormat.length - 1]
    )
  }
})

// 添加配置文件到muler对象。
let upload = multer({
  storage: storage
})

/*
 * 如需其他设置，请参考multer的limits,使用方法如下:
 * let upload = multer({
 *   storage: storage,
 *   limits: {}
 * })
 */

module.exports = upload
