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

export const getCouponDetail = (id: number): AxiosPromise<ResponseData> => {
  return httpRequest.request({
    method: 'get',
    url: '/getCoupon/couponDetail',
    params: { id }
  });
}

export const getCoupon = (coupon_id: number, user_id: number): AxiosPromise<ResponseData> => {
  return httpRequest.request({
    method: 'get',
    url: '/getCoupon/getCoupon',
    params: { coupon_id, user_id }
  });
}

export const publishComment = (
  id: number, 
  phone: string, 
  starGrade: number, 
  commentContent: string, 
  couponId: number
): AxiosPromise<ResponseData> => {
  return httpRequest.request({
    method: 'post',
    url: '/getCoupon/publishComment',
    data: { id, phone, starGrade, commentContent, couponId }
  });
}