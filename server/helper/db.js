/*
 * 数据库配置
 * @author: zhaoyiming
 * @since:  2017/9/16
*/

const mysql = require('mysql');

const db = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: '',
	database: 'tour'
});
db.connect();

module.exports = (sql, callback) => {
	return new Promise((resolve, reject) => {
		db.query(sql, (err, data) => {
			if (err) reject(err);
			else resolve(data);
		});
	});
};