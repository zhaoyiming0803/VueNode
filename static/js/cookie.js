/*
 * Description: JS操作cookie一系列方法封装
 * User: zhaoyiming
 * Date: 2017/10/5
 * License: MIT , https://github.com/zymseo/cookie
*/

;(function (global, oDoc, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(oDoc) :
	typeof define === 'function' && define.amd ? define([], function () {return factory(oDoc);}) :
	(global.cookie = factory(oDoc));
})(this, document, function (oDoc) {
	'use strict';

	function Cookie () {}

	Cookie.prototype.get = function (name) {
		var cookieStr = oDoc.cookie,
			cookieArry = cookieStr.split(';'),
			len = cookieArry.length,
			cookieObj = {},
			i, tmpArry;
		
		for (i = 0; i < len; i += 1) {
			tmpArry = cookieArry[i].replace(/\s/g, '').split('=');
			cookieObj[tmpArry[0]] = tmpArry[1];
		}

		return cookieObj[name];
	};

	Cookie.prototype.set = function (opt) {
		var host = global.location.host,
			name = opt.name,
			value = opt.value,
			expires = opt.expires ? opt.expires : 0,
			path = opt.path ? opt.path : '/',
			domain = opt.domain ? opt.domain : host.substr(0, host.indexOf(':'));
		
		if (!name) {
			alert('请设置cookie名！');
			return false;
		}

		oDoc.cookie = name + '=' + value + '; expires=' + expires + '; path=' + path + ';domain=' + domain;
	};

	Cookie.prototype.unset = function (name) {
		var cookieDate = new Date();
		cookieDate.setTime(cookieDate.getTime()-1);
		this.set({name: name, value: '', expires: cookieDate.toGMTString()});
	};

	var cookie = new Cookie();

	return cookie;
});