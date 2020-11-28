import Layout from '@/layouts/Layout.vue';
import personRoute from './person.route';
import constantRoutes from './constant.route';

const asyncRoutes = [
  personRoute,
];

asyncRoutes.forEach((route) => {
  if (!route.component) {
    // eslint-disable-next-line no-param-reassign
    route.component = Layout;
  }
});

export {
  constantRoutes,
  asyncRoutes,
};
