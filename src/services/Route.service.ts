import { Singleton } from '@/utils/singleton';
import { ref, Ref } from 'vue';
import { RouteLocationNormalized, Router } from 'vue-router';
import { asyncRoutes } from '@/router/routes';
import { cloneDeep, isArray } from 'lodash';
import { userService } from './User.service';
import { permissionService } from './Permission.service';

@Singleton
export class RouteService {
  static instance: RouteService;

  static getInstance: () => RouteService;

  // 路由树
  routes: Ref<RouteConfig[]> = ref([]);

  // 用于表示路由是否生成成功
  genRouteSuccess = false;

  flatRoutes(routes: RouteConfig[]): RouteConfig[] {
    let flat: RouteConfig[] = [];
    for (const route of routes) {
      flat.push(route);
      if (route.children?.length) {
        const children = this.flatRoutes(route.children);
        flat = [...flat, ...children];
      }
    }
    return flat;
  }

  mergePermissions(routes: RouteConfig[]): string[] {
    const p = routes.map(({ meta: { permissions = [] } }) => permissions);
    const flatP = p.flat();
    return Array.from(new Set(flatP));
  }

  filterRoutes(routes: RouteConfig[]): RouteConfig[] {
    const authRoutes: RouteConfig[] = [];
    for (const route of routes) {
      const cloneRoute = cloneDeep(route);
      let permissions = cloneRoute.meta?.permissions;
      const { children } = cloneRoute;
      if (!isArray(permissions)) {
        const flatChildren = this.flatRoutes(children || []);
        permissions = this.mergePermissions(flatChildren);
      }
      const accessed = permissionService.hasPermission(permissions);
      if (accessed) {
        if (children?.length) {
          cloneRoute.children = this.filterRoutes(children);
        }
        authRoutes.push({ ...cloneRoute });
      }
    }
    return authRoutes;
  }

  genRoutes(routes: RouteConfig[]) {
    if (this.genRouteSuccess) {
      return Promise.resolve(this.routes.value);
    }
    return userService.getUserInfo()
      .then(() => {
        this.routes.value = this.filterRoutes(routes);
        this.genRouteSuccess = true;
        return this.routes.value;
      });
  }

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
    return userService.getUserInfo().then(() => this.genRoutes(asyncRoutes)).then(() => {
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

  findFirstRoute(routes: RouteConfig[]): RouteConfig {
    const routesList: RouteConfig[] = [];
    for (const item of routes) {
      if (!item.meta.abstract) {
        routesList.push(item);
      }

      if (item?.children?.length) {
        routesList.push(this.findFirstRoute(item.children as RouteConfig[]));
      }
    }
    return routesList.find((item) => !item.meta.hiddenMenu)
      || routesList[0]
      || { name: 'Result', params: { status: '403' } } as unknown as RouteConfig;
  }

  getFirstRoute(
    router?: Router,
    parentRouteName?: string,
  ) {
    // 如果有传入父路由
    if (router && parentRouteName) {
      const routes = router.resolve({ name: parentRouteName }).matched;
      if (routes.length !== 0) {
        const route = routes[routes.length - 1] as unknown as RouteConfig;
        if (!route.meta.abstract) {
          return route;
        }
        const firstRoute = this.findFirstRoute(route.children || []);
        return firstRoute;
      }
    }

    const authRoutes = this.routes.value;
    if (authRoutes.length) {
      const firstRoute = this.findFirstRoute(authRoutes);
      return firstRoute;
    }

    return { name: 'Result', params: { status: '403' } } as unknown as RouteConfig;
  }
}

export const routeService = RouteService.getInstance();
