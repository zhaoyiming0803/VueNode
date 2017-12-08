/*
 * Description : 文件上传校验
 * User : zhaoyiming
 * Date : 2017/07/17
 * License: Apache2.0 ,https://github.com/zymseo/validateFileUpload
*/

;(function (global, oDoc, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(oDoc) :
	typeof define === 'function' && define.amd ? define([], function () {return factory(oDoc);}) :
	(global.validateFileUpload = factory(oDoc));
})(this, document, function (oDoc) {
	'use strict';

	// 是否是一个function
	function isFunction (fn) {
		return Object.prototype.toString.call(fn) === '[object Function]' ? fn : function (res) {return res;};
	}

	// 校验各类上传文件大小是否符合规范
	function validateSize (_this, file) {
		 if (file === undefined) {
            return false;
        }
		if(_this.maxSize * Math.pow(1024, 2)  < file.size){
			alert('文件最大不能超过' + _this.maxSize + 'M');
			return false;
		}
		return true;
	}

	// 校验各类上传文件格式是否符合规范
	function validateType (file, fileType) {
		if (file === undefined) {
	        return false;
        }

		var fileTypeLen = fileType.length,
			isValidated = false,
			fileName = file.name,
			suffix = fileName.substr(fileName.indexOf('.') + 1),
			i = 0;

		for (; i < fileTypeLen; i++) {
			if (suffix.toLowerCase() === fileType[i]) {
				isValidated = true;
				break;
			}
		}

		if (!isValidated) {
			return false;
		}

		return true;
	}

	// 在html中显示上传的文件，例如图片
	function showSource (_this, file) {
		var showEle = _this.showEle;
		if( window.FileReader ) {
			var fr = new FileReader();
			fr.onloadend = function (e) {
				showEle.src = e.target.result;
			};
			fr.readAsDataURL( file );
			showEle.style.display = 'block';
		}
	}

	// 一系列校验
	function validateFile (_this, source, type) {
		if (!_this.inptEle) {
			alert('请在配置项中指定本地的上传表单！');
			return false;
		}

		if (!type) {
			return true;
		}

		var file = source.files[0];

		var validateSizeResult = validateSize(_this, file);
		if (!validateSizeResult) {
			_this.inptEle.value = '';
			return false ;
		}

		var validateTypeResult = validateType(file, type);
		if (!validateTypeResult) {
			_this.inptEle.value = '';
			return false;
		}

		if (_this.showEle) {
			showSource(_this, file);
		}

		return true;
	}

	// 校验类
	function ValidateFileUpload (opt) {
		var fileType = opt.fileType,
			maxSize = opt.maxSize,
			showEle = opt.showEle,
			inptEle = opt.inptEle,
			success = opt.success,
			error = opt.error;

		this.fileType = fileType ? fileType : null; // 允许上传到文件类型，数组['jpg', 'jpeg', 'png', 'gif', 'bmp', 'docx', 'xls', 'pptx', 'txt', 'mp4', 'mp3']
		this.maxSize = maxSize ? maxSize  : 100; // 默认允许上传最大2M的文件
		this.showEle = showEle ? oDoc.querySelector('#' + showEle) : null; // 默认在html中显示上传文件的dom，一般用于image
		this.inptEle = oDoc.querySelector('#' + inptEle); // 上传文件input表单
		this.success = isFunction(success); // 成功时回调
		this.error = isFunction(error); // 错误时回调
	}

	ValidateFileUpload.prototype.init = function (source) {
		return validateFile(this, source, this.fileType) ? true : false;
	}
	
	// 实例化类，并返回校验结果
	function validateFileUpload (opt) {
		var validateObj = new ValidateFileUpload(opt),
			validateRes = validateObj.init(validateObj.inptEle);
		validateRes ? validateObj.success(true) : validateObj.error(false);
	}

	return validateFileUpload;
});