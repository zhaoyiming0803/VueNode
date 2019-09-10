/**
 * upload file
 * @author zhaoyiming
 * @since 2019/09/09
 */

interface Headers {
  [propName: string]: any
}

interface Data {
  [propName: string]: any
}

interface Options {
  action: string
  headers: Headers
  withCredentials: boolean
  fileName: string
  data: Data
  file: string | Blob
  onProgress: (process: number) => void
  onSuccess: (res: any) => void,
  onError: (res: any) => void,
  onComplete: (res: any) => void
}

function upload (options: Options) {
  const xhr = window.XMLHttpRequest 
    ? new XMLHttpRequest()
    : new ActiveXObject('Microsoft.XMLHTTP');
  
  if (validateContextAndParams(xhr, options) !== true) {
    return;
  }

  initUploadOptions(xhr, options);
  run(xhr, options);
}

function validateContextAndParams (xhr: XMLHttpRequest, options: Options) {
  if (!xhr.upload) {
    return error('Current browsers do not support file upload');
  }

  if (!isPlainObject(options)) {
    return error(`The parameter of "upload" function must be an object`);
  }

  if (!options.action) {
    return error('The options.action is not defined');
  }

  if (!options.file) {
    return error('The options.file is not defined');
  }

  return true;
}

function initUploadOptions (xhr: XMLHttpRequest, options: Options) {
  xhr.upload.onprogress = function (ev: ProgressEvent): any {
    let percent: number = 0;
    if (ev.total > 0) {
      percent = ev.loaded / ev.total * 100;
    }

    const onProgress = options.onProgress;
    isFunction(onProgress) && onProgress(percent); 
  }
}

function run (xhr: XMLHttpRequest, options: Options) {
  xhr.open('POST', options.action, true);

  withCredentials(xhr, options.withCredentials);
  setHeaders(xhr, options);
  
  const formData = setBody(options);
  
  onError(xhr, options);
  onLoad(xhr, options);
  send(xhr, formData);
}

function withCredentials (xhr: XMLHttpRequest, withCredentials: boolean) {
  if (withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = withCredentials;
  }
}

function setHeaders (xhr: XMLHttpRequest, options: Options) {
  const headers = options.headers;

  if (!headers) return;
  if (!isPlainObject(headers)) throw new Error('The prop of headers must be an object');
  
  for (let prop in headers) {
    const value = headers[prop];
    if (headers.hasOwnProperty(prop) && value) {
      xhr.setRequestHeader(prop, value);
    }
  }
}

function setBody (options: Options) {
  const formData = new FormData();
  const data = options.data;
  const fileName = options.fileName
    ? options.fileName
    : 'file';

  if (data) {
    Object.keys(data).map(key => {
      formData.append(key, data[key]);
    });
  }

  formData.append(fileName, options.file);

  return formData;
}

function send (xhr: XMLHttpRequest, formData: FormData) {
  xhr.send(formData);
}

function onError (xhr: XMLHttpRequest, options: Options) {
  xhr.onerror = function error (e) {
    getError(options, getBody(xhr));
  }
}

function onLoad (xhr: XMLHttpRequest, options: Options) {
  xhr.onload = function onload () {
    const status = xhr.status;
    const res = getBody(xhr);
    const onComplete = options.onComplete;

    if (status >= 200 && status < 300) {
      getSuccess(options, xhr);
    } else {
      getError(options, res);
    }

    isFunction(onComplete) && onComplete(res);
  }
}

function getBody (xhr: XMLHttpRequest) {
  const response = xhr.responseText || xhr.response;
  try {
    return JSON.parse(response);
  } catch (e) {
    return e;
  }
}

function getSuccess (options: Options, xhr: XMLHttpRequest) {
  const onSuccess = options.onSuccess;
  isFunction(onSuccess) && onSuccess(getBody(xhr));
}

function getError (options: Options, e: XMLHttpRequestResponseType) {
  const onError = options.onError;
  isFunction(onError) && onError(e);
}

function isPlainObject (field: any) {
  return Object.prototype.toString.call(field) === '[object Object]';
}

function isFunction (field: any) {
  return Object.prototype.toString.call(field) === '[object Function]';
}

function error (msg: string) {
  console.error(msg);
}

export default upload;
