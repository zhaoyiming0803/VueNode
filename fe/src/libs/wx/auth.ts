import ajax from './ajax';

async function wxAuth (redirectURI: string) {
  const result = await ajax({
    method: 'POST',
    url: 'https://api.0351zhuangxiu.com/wechat/auth/authorizeCode',
    data: {
      redirectURI
    }
  });
  
  window.location.href = result.url;
}

export default wxAuth;