import httpRequest, { ResponseData } from './index';
import { AxiosPromise } from 'axios';

export const getCouponComment = (couponId: Number): AxiosPromise<ResponseData> => {
  return httpRequest.request({
    method: 'get',
    url: '/comment/get',
    params: { couponId }
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
    url: '/comment/publish',
    data: { id, phone, starGrade, commentContent, couponId }
  });
}