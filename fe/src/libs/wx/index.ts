import { AjaxResponse } from './types';

async function wechat() {
  const config = await ajax();

  wx.config({ 
    debug: false, 
    appId: config.appId,
    timestamp: config.timestamp,
    nonceStr: config.nonceStr,
    signature: config.signature,
    jsApiList: [
      'checkJsApi',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareQZone',
      'chooseImage',
      'uploadImage',
      'downloadImage',
      'scanQRCode'
    ]
  });

  wx.ready(() => {
    wx.checkJsApi({
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareQZone',
        'chooseImage'
      ],
      success (res: any) {
        console.log(res); 
      }
    });

    const shareOption = {
      title: '欢迎来到锦囊团官网',
      desc: '全世界各地的优惠券免费拿哦',
      link: window.location.href,
      imgUrl: 'https://web.0351zhuangxiu.com/tour/static/images/jnt.png'
    };

    wx.onMenuShareTimeline(shareOption);
    wx.onMenuShareAppMessage(shareOption);
  });
}

function ajax(): Promise<AjaxResponse> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://api.0351zhuangxiu.com/wechat/auth/signature', true);

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4 || xhr.status === 0) return;

      const responseData: AjaxResponse = JSON.parse(xhr.response);

      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(responseData);
      } else {
        reject(`request failed with status code ${xhr.status}`);
      }
    };

    xhr.send();
  });
}

export default wechat;