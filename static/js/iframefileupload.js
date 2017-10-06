/*
 * Description: iframefileupload.js通过原生JS实现，用最少的代码库依赖实现页面无刷新上传文件的同时也可以向后端传递json数据等。
 * User: zhaoyiming
 * Date: 2017/08/15
 * License: Apache2.0 , https://github.com/zymseo/iframeFileUpload
*/

;(function (global, oDoc, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(oDoc) :
	typeof define === 'function' && define.amd ? define([], function () {return factory(oDoc);}) :
	(global.iframeFileUpload = factory(oDoc));
})(this, document, function (oDoc) {
	'use strict';

	function strToDom (str) {
		var oDiv = oDoc.createElement("div");
		oDiv.innerHTML = str;
		return oDiv.childNodes[0];
	}
	
	function createUploadIframe (oDoc, oBody, id) {
		var iframeId = 'iframe' + id,
			iframeHtml = '<iframe name="'+ iframeId +'" id="'+ iframeId +'" src="about:blank" frameborder="0" style="display:none;"></iframe>';
		oBody.appendChild(strToDom(iframeHtml));
		return oDoc.querySelector('#' + iframeId);
	}
	
	function createUploadForm (oDoc, oBody, url, data, id) {
		var formId = 'form' + id,
			tmpInpt = null,
			formHtml = '<form action="'+ url +'" target="iframe'+ id +'" name="fileinfo" method="POST" enctype="multipart/form-data" id="'+ formId +'" style="display: none;">';
		
		for (var prop in data) {
			formHtml += '<input type="text" name="'+ prop +'" value="'+ data[prop] +'" />';
		}
		formHtml += '</form>';

		oBody.appendChild(strToDom(formHtml));
		return oDoc.querySelector('#' + formId);
	}

	// 从后端获取到的数据
	function getData (iframe) {
		return iframe.contentWindow.document.body.innerHTML || iframe.contentDocument.body.innerHTML;
	}
	
	function IframeFileUpload (opt) {
		this.opt = opt;
	}

	IframeFileUpload.prototype.init = function () {
		var opt = this.opt,
			_url = opt.url, // 后端url
			_elementId = typeof opt.elementId === 'string' ? [opt.elementId] : opt.elementId ? opt.elementId : false, // 上传表单的id数组集合，例：['file1', 'file2']
			_elementIdLen = _elementId ? _elementId.length : 0,
			_data = opt.data, // 发送到后端的数据
			_success = opt.success, // 成功回调
			_error = opt.error, // 失败回调
			oBody = oDoc.body,
			id = new Date().getTime(),
			iframe = createUploadIframe(oDoc, oBody, id),
			form = createUploadForm(oDoc, oBody, _url, _data, id),
			frag = null,
			tmpNode = null,
			oldNode = null;
			
		if (_elementIdLen) {
			frag = oDoc.createDocumentFragment();
			for (var i = 0; i < _elementIdLen; i += 1) {
				oldNode = oDoc.querySelector('#' + _elementId[i]);
				tmpNode = oldNode.cloneNode(true);
				
				oldNode.parentNode.insertBefore(tmpNode, oldNode);
				frag.appendChild(oldNode);
			}
			form.appendChild(frag);
			form.submit();
			frag = null;
		}

		iframe.onload = function () {
			try {
				_success(getData(iframe));
			} catch (e) {
				_error(e);
			}

			oBody.removeChild(oDoc.querySelector('#iframe' + id));
			oBody.removeChild(oDoc.querySelector('#form' + id));

			iframe = form = opt = null;
		};
	};

	function iframeFileUpload (opt) {
		new IframeFileUpload(opt).init();
	}

	return iframeFileUpload;
});