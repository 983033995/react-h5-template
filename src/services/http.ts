/*
 * @FilePath: /h5-react/src/services/http.ts
 * @Description:
 */
import axios, { type AxiosRequestConfig } from 'axios';
import get from 'lodash-es/get';
import { Toast } from 'antd-mobile';
import composeMiddlewares from './axiosInterceptors/request';
import Qs from 'qs';
import { getStorageItem } from '../utils/storageUtils';

enum RES_CODE {
  Success = 200,
  InvalidToken = 20003,
}

export interface HttpRespData<T = any> {
  data: T;
  code: number;
  msg: string;
}

function createHttp(config: AxiosRequestConfig = {}) {
  const http = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    timeout: 60 * 1000,
    paramsSerializer: params => {
      return Qs.stringify(params, { arrayFormat: 'indices' });
    },
    headers: {
      Token: getStorageItem('token'),
      app_platform: 'h5',
      App: 'galaxy-admin',
    },
    ...config,
  });

  http.interceptors.request.use(composeMiddlewares, error => {
    return Promise.reject(error);
  });

  http.interceptors.response.use(
    res => {
      console.log('axios res', res);
      const respData: HttpRespData = get(res, 'data', {});
      console.log('axios res.data', respData);
      const res_data_msg = get(respData, 'msg', '');
      switch (respData.code) {
        case RES_CODE.Success: // 正常业务流程
          return respData.data;
        case RES_CODE.InvalidToken: // token失效
          Toast.show({
            content: res_data_msg,
            icon: 'fail',
          });
          location.href = `${location.origin}${location.pathname}#/login`;
          // location.reload()
          return Promise.reject(respData);
        default:
          Toast.show({
            content: res_data_msg,
            icon: 'fail',
          });
          return Promise.reject(respData);
      }
    },
    error => {
      if (error.response) return Promise.reject(error.response.data);
      return Promise.reject(error.message);
    },
  );

  return http;
}

// 导出默认的http实例
export default createHttp();
