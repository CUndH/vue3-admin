import { RouteMeta, RouteRecordRaw } from 'vue-router';

declare global {
  type RouteConfig = RouteRecordRaw & {
    name: string;
    path: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component?: any;
    children?: RouteConfig[];
    meta: RouteMeta;
  };

  interface Menu {
    name: string;
    title: string;
    meta: RouteMeta;
    children?: Menu[];
  }
}
