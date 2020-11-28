import { createRouter, createWebHistory } from 'vue-router';
import constantRoutes from './constant.route';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    ...constantRoutes,
  ],
});

export default router;
