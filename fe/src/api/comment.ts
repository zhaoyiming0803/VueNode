import httpRequest, { ResponseData } from './index'
import { AxiosPromise } from 'axios'

export const getCouponComment = (
  couponId: number
): AxiosPromise<ResponseData> => {
  return httpRequest.request({
    method: 'get',
    url: '/tour/comment/get',
    params: { couponId }
  })
}

export const publishComment = (
  userId: number,
  starGrade: number,
  commentContent: string,
  couponId: number
): AxiosPromise<ResponseData> => {
  return httpRequest.request({
    method: 'post',
    url: '/tour/comment/publish',
    data: { userId, starGrade, commentContent, couponId }
  })
}
