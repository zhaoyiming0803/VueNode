import httpRequest, { ResponseData } from './index';
import { AxiosPromise } from 'axios';

export const getBaseInfo = (id: number): AxiosPromise<ResponseData> => {
  return httpRequest.request({
    method: 'post',
    url: '/personal/basicInfo',
    params: { id }
  });
};

export const showCoupon = (
  userId: number, 
  type: 'union' | 'visa' | 'jinnang' | 'gaodaowu'
): AxiosPromise<ResponseData> => {
  return httpRequest.request({
    method: 'get',
    url: '/personal/showCoupon',
    params: {
      user_id: userId,
      type
    }
  });
}

export const getUserInfo = (id: number): AxiosPromise<ResponseData> => {
  return httpRequest.request({
    method: 'get',
    url: '/personalEdit/getMsg',
    params: { id }
  });
}