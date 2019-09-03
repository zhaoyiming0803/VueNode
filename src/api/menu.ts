import httpRequest, { ResponseData } from './index';
import { AxiosPromise } from 'axios';

export const getMenuListReq = (token: string): AxiosPromise<ResponseData> => {
  return httpRequest.request({
    url: '/api/memu/list',
    params: {
      token
    },
    method: 'get'
  });
};