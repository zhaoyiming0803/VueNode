import httpRequest, { ResponseData } from './index'
import { AxiosPromise } from 'axios'

export const login = (
  phone: string,
  pwd: string
): AxiosPromise<ResponseData> => {
  return httpRequest.request({
    method: 'post',
    url: '/tour/auth/loginForm',
    data: { phone, pwd }
  })
}

export const regist = (
  phone: string,
  pwd: string
): AxiosPromise<ResponseData> => {
  return httpRequest.request({
    method: 'post',
    url: '/tour/auth/registForm',
    data: { phone, pwd }
  })
}

export const getPhoneCode = (phone: string): AxiosPromise<ResponseData> => {
  return httpRequest.request({
    method: 'post',
    url: '/tour/auth/getPhoneCode',
    data: { phone }
  })
}

export const resetPassword = (
  phone: string,
  pwd: string
): AxiosPromise<ResponseData> => {
  return httpRequest.request({
    method: 'post',
    url: '/tour/auth/resetPassword',
    data: { phone, pwd }
  })
}
