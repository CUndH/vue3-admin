/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import { RouteMeta, RouteRecordRaw } from 'vue-router';

declare global {
  type RouteConfig = RouteRecordRaw & {
    name: string;
    path: string;
    component?: any;
    children?: RouteConfig[];
    meta: RouteMeta;
  };
  interface Response<T = any> {
    success: boolean;
    data: T;
    message?: string;
  }

  type HttpResponse<T = any> = AxiosResponse<Response<T>>;

  type HttpResponseP<T = any> = Promise<HttpResponse<T>>;

  interface Menu {
    name: string;
    title: string;
    meta: RouteMeta;
    children?: Menu[];
  }
}
