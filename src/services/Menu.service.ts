import { Singleton } from '@/utils/singleton';
import { computed, ComputedRef } from 'vue';
import { cloneDeep } from 'lodash';
import { routeService } from './Route.service';

@Singleton
export class MenuService {
  static instance: MenuService;

  static getInstance: () => MenuService;

  menus: ComputedRef<Menu[]> = computed(() => this.genMenus(routeService.routes.value));

  genMenus(routes: RouteConfig[]) {
    const visibilityRoutes = this.getVisibilityRoutes(routes);
    const menus = visibilityRoutes.map((route) => this.route2Menu(route));
    return menus;
  }

  getVisibilityRoutes(routes: RouteConfig[]): RouteConfig[] {
    const visibilityRoutes = [];
    for (const route of routes) {
      const { meta: { hiddenMenu }, children } = route;
      if (!hiddenMenu) {
        const cloneRoute = cloneDeep(route);
        if (children && children.length) {
          cloneRoute.children = this.getVisibilityRoutes(children);
        }
        visibilityRoutes.push({ ...cloneRoute });
      }
    }
    return visibilityRoutes;
  }

  route2Menu(route: RouteConfig): Menu {
    return {
      name: route.name,
      meta: route.meta,
      title: route.meta.title,
      children: route.children && route.children.length
        ? route.children.map((v) => this.route2Menu(v as RouteConfig))
        : [],
    };
  }
}

export const menuService = MenuService.getInstance();
