namespace Wechat {
  interface WxOptions {
    debug?: boolean,  // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: string,    // 公众号的唯一标识
    timestamp: string,// 生成签名的时间戳
    nonceStr: string, // 生成签名的随机串
    signature: string,// 签名
    jsApiList: [      // 根据微信文档（附录2）及自身需要填充
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
  }

  interface BaseShareOption {
    title: string,  // 分享标题
    desc: string,   // 分享描述
    link: string,   // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: string, // 分享图标
    success?: Function
  }

  /**
   * 分享给微信朋友或QQ好友
   */
  interface UpdateAppMessageShareData extends BaseShareOption {}

  /**
   * 分享到微信朋友圈或QQ空间
   */
  interface UpdateTimelineShareData extends BaseShareOption {}

  /**
   * 分享给微信好友
   */
  interface OnMenuShareAppMessage extends BaseShareOption {
    type?: 'music' | 'video' | 'link', // 不填默认为link
    dataUrl?: string, // 如果type是music或video，则要提供数据链接，默认为空
  }

  /**
   * 分享到微信朋友圈
   */
  interface OnMenuShareTimeline extends BaseShareOption {}

  export interface Wx {
    config(options: WxOptions): void,
    ready(fn: Function): void,
    checkJsApi(options: any): void,
    updateAppMessageShareData(options: UpdateAppMessageShareData): void,
    updateTimelineShareData(options: UpdateTimelineShareData): void,
    onMenuShareTimeline(options: OnMenuShareTimeline): void,
    onMenuShareAppMessage(options: OnMenuShareAppMessage): void
  }
}
