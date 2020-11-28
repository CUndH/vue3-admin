import Result from '@/views/Result.vue';

const constantRoutes: Array<RouteConfig> = [
  {
    name: 'Index',
    path: '',
    component: () => import('@/views/index.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    name: 'Result',
    path: '/result/:status',
    component: Result,
    props(route) {
      const status = route.params.status as '404' | '403' | '500';
      const subTitle = {
        403: '您没有权限访问该页面！',
        404: '您要访问的页面不存在！',
        500: '服务器错误！',
      }[status] || '未知错误';
      return {
        status,
        title: status,
        subTitle,
      };
    },
    meta: {
      title: '',
    },
  },
];

export default constantRoutes;
