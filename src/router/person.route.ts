const personRoute: RouteConfig = {
  name: 'Person',
  path: '/person',
  component: () => import('@/layouts/Layout.vue'),
  meta: {
    title: '人员管理',
    abstract: true,
  },
  children: [
    {
      name: 'Person.List',
      path: 'list',
      meta: {
        title: '人员列表',
      },
      component: () => import('@/views/person/list.vue'),
    },
  ],
};

export default personRoute;
