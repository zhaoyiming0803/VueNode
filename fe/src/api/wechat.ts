import httpRequest, { ResponseData } from './index';
import { AxiosPromise } from 'axios';

export const authorizeUserInfo = (code: number | string): AxiosPromise<ResponseData> => {
  return httpRequest.request({
    method: 'post',
    url: '/wechat/auth/authorizeUserInfo',
    params: { code }
  });
}