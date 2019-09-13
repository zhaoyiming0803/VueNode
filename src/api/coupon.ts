import httpRequest, { ResponseData } from './index';
import { AxiosPromise } from 'axios';

export const getCouponsList = (regionId: number, classifyId: number, page: number): AxiosPromise<ResponseData> => {
  return httpRequest.request({
    method: 'get',
    url: '/coupon/home',
    params: { regionId, classifyId, page }
  });
};

export const getClassifyList = (): AxiosPromise<ResponseData> => {
  return httpRequest.request({
    method: 'get',
    url: '/coupon/classify'
  });
}

export const getRegionList = (): AxiosPromise<ResponseData> => {
  return httpRequest.request({
    method: 'get',
    url: '/region/list'
  });
}

export const getCouponDetail = (id: number): AxiosPromise<ResponseData> => {
  return httpRequest.request({
    method: 'get',
    url: '/coupon/detail',
    params: { id }
  });
}

export const getCouponRecord = (userId: number): AxiosPromise<ResponseData> => {
  return httpRequest.request({
    method: 'get',
    url: '/coupon/record',
    params: { userId }
  });
}

export const receiveCoupon = (couponId: number, userId: number): AxiosPromise<ResponseData> => {
  return httpRequest.request({
    method: 'post',
    url: '/coupon/receive',
    data: { couponId, userId }
  });
}

export const getReceivedCouponList = (
  userId: number, 
  type: 'union' | 'visa' | 'jinnang' | 'gaodaowu'
): AxiosPromise<ResponseData> => {
  return httpRequest.request({
    method: 'get',
    url: '/coupon/received',
    params: { userId, type }
  });
}
