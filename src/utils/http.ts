/* eslint-disable prefer-promise-reject-errors */
import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { message as Message } from 'ant-design-vue';

const http = Axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 15000,
  withCredentials: true,
  validateStatus(status) {
    return status >= 200 && status <= 500;
  },
});

function requestInterceptor(config: AxiosRequestConfig) {
  return config;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function requestErrorInterceptor(error: any) {
  Message.error(error);
  return Promise.reject(error);
}

async function responseInterceptor(response: AxiosResponse<Response<object>>) {
  // eslint-disable-next-line prefer-const
  let { data } = response;
  const { success } = data;
  if (success) {
    return response;
  }
  return Promise.reject(data);
}

function responseErrorInterceptor(error: { isAxiosError?: boolean; message?: string }) {
  if (Axios.isCancel(error)) {
    return Promise.reject({ message: 'cancel request' });
  }
  if (error.isAxiosError) {
    return Promise.reject({ ...error, message: error.message });
  }
  return Promise.reject({ ...error, message: '服务异常，请稍后尝试！' });
}

http.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
http.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

export { http };
