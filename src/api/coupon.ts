import httpRequest, { ResponseData } from './index';
import { AxiosPromise } from 'axios';

export const getCouponsList = (countryId: number, classifyId: number, currentPage: number): AxiosPromise<ResponseData> => {
  return httpRequest.request({
    method: 'post',
    url: '/globalCouponList/showCoupons',
    data: { countryId, classifyId, currentPage }
  });
};

export const getClassifyList = (): AxiosPromise<ResponseData> => {
  return httpRequest.request({
    method: 'get',
    url: '/globalCouponList/classifyList'
  });
}

export const getCountryList = (): AxiosPromise<ResponseData> => {
  return httpRequest.request({
    method: 'get',
    url: '/globalCouponList/countryList'
  });
}