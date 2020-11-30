import { Singleton } from '@/utils/singleton';
import { ref, Ref } from 'vue';
import { RouteLocationNormalized, Router } from 'vue-router';
import { asyncRoutes } from '@/router/routes';
import { userService } from './User.service';

@Singleton
export class RouteService {
  static instance: RouteService;

  static getInstance: () => RouteService;

  // 路由树
  routes: Ref<RouteConfig[]> = ref([]);

  // 用于表示路由是否生成成功
  genRouteSuccess = false;

  routerSetup(
    router: Router,
    to: RouteLocationNormalized,
  ) {
    if (this.genRouteSuccess) {
      const route = router.hasRoute(to.name as string)
        ? to
        : { name: 'Result', params: { status: '404' } };
      return Promise.resolve(route);
    }
    return userService.getUserInfo().then(() => {
      this.routes.value = asyncRoutes;
      const routes = this.routes.value;
      routes.forEach((route) => {
        router.addRoute(route);
      });
      let replace = false;
      let routeLocation = to;

      if (to.name === undefined) {
        routeLocation = router.resolve(to);
        replace = true;
      }
      if (router.hasRoute(routeLocation.name as string)) {
        return replace ? { ...to, replace } : to;
      }
      return { name: 'Result', params: { status: '404' } };
    });
  }
}

export const routeService = RouteService.getInstance();
