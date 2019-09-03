import httpRequest, { ResponseData } from './index';
import { AxiosPromise } from 'axios';

export const getUserInfoReq = (token: string): AxiosPromise<ResponseData> => {
  return httpRequest.request({
    url: '/api/user/info',
    params: {
      token
    },
    method: 'get'
  });
};