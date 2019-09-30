// axios默认参数
import { AxiosRequestConfig } from 'axios';

export const OPTIONS: AxiosRequestConfig = Object.freeze({
  headers: {
    common: {},
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  // transformRequest(data: any) {
  //   return JSON.stringify(data);
  // },
  proxy: {
    host: 'localhost',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l',
    },
  },
});
