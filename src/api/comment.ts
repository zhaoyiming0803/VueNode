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
  userId: number, 
  starGrade: number, 
  commentContent: string, 
  couponId: number
): AxiosPromise<ResponseData> => {
  return httpRequest.request({
    method: 'post',
    url: '/comment/publish',
    data: { userId, starGrade, commentContent, couponId }
  });
}