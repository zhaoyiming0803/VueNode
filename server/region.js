/*
 * 国家和地区相关
 * @author: zhaoyiming
 * @since:  2019/9/13
*/

const express = require('express');
const router = express.Router();
const db = require('./db');

/**
 * 国家与地区列表
 */
router.get('/list', async (req, res) => {
  try {
    const data = await db('select id, country_name from tour_country');
    res.json({ code: 0, data, message: '' });
  } catch (e) {
    res.json({ code: -1, data: null, message: e });
  }
});

module.exports = router;