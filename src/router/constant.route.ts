export const constantRoutes: Array<RouteConfig> = [
  {
    name: 'Index',
    path: '/',
    component: () => import('@/views/index.vue'),
    meta: {
      title: '首页',
    },
  },
];
