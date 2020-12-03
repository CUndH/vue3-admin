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

  interface ResponseError {
    [key as string]: any;
    msg: string;
    code: number;
  }

  interface TableResponse<T> {
    page: number;
    size: number;
    total: number;
    content: T[];
  }
  interface PageQuery {
    page?: number;
    size?: number;
  }

  type HttpResponse<T = any> = AxiosResponse<Response<T>>;

  type HttpResponseP<T = any> = Promise<HttpResponse<T>>;

  type HttpTableResponse<T = any> = HttpResponse<TableResponse<T>>;

  type HttpTableResponseP<T = any> = Promise<HttpTableResponse<T>>;

  interface Menu {
    name: string;
    title: string;
    meta: RouteMeta;
    children?: Menu[];
  }
}
