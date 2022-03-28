/**
 * Article
 * @author: zhaoyiming
 * @since:  2017/9/29
 */

const express = require('express')
const router = express.Router()
const db = require('../helper/db')

router.get('/list', async (req, res) => {
  const { regionId } = req.query
  const $query =
    'select feature_title, feature_ico_path, feature_url, feature_classify from tour_feature' +
      regionId ===
    1
      ? ' '
      : ' where feature_belong_region = "' + regionId + '" '
  const $limit = 'limit 0, 4'
  try {
    const articleList = await db($query + ' ' + $limit)
    res.json({ code: 0, data: articleList, message: '' })
  } catch (e) {
    res.json({ code: -1, data: [], message: e })
  }
})

module.exports = router
