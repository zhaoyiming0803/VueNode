import ajax from './ajax';

async function wechat() {
  const ua: string = navigator.userAgent.toLowerCase();
  const reg: RegExp = /MicroMessenger/i;
  const matchedResult: RegExpMatchArray | null = ua.match(reg);

  if (matchedResult === null || matchedResult[0] !== 'micromessenger') {
    return;
  }

  const config = await ajax({
    method: 'GET',
    url: 'https://api.0351zhuangxiu.com/wechat/auth/signature'
  });

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
      'scanQRCode',
      'getLocation'
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
    wx.getLocation({
      type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: function (res) {
        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
      }
    });
  });
}

export default wechat;