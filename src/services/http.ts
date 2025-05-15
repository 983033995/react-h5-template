/*
 * @FilePath: /galaxy-app-h5/src/services/http.ts
 * @Description:
 */
import axios, { type AxiosRequestConfig } from 'axios';
import get from 'lodash-es/get';
import { Toast } from 'antd-mobile';

enum RES_CODE {
  Success = 200,
  InvalidToken = 20003,
}

export interface HttpRespData<T = any> {
  data: T;
  code: number;
  msg: string;
}

function createHttp(config: AxiosRequestConfig) {
  const http = axios.create(config);

  http.interceptors.request.use(
    async config => {
      //   const token = getToken() || undefined;
      //   config.headers.Authorization = token;
      // const uid = getUid() || undefined;
      // config.headers.uid = uid;
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

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
      console.log(error);
      console.log(error?.response);
      if (error.response) return Promise.reject(error.response.data);
      return Promise.reject(error.message);
    },
  );

  return http;
}

export default createHttp({
  baseURL: import.meta.env.VITE_APP_GO_API,
});
