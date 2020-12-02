import { computed } from 'vue';
import { Singleton } from '@/utils/singleton';
import { userService } from './User.service';

@Singleton
export class PermissionService {
  static instance: PermissionService;

  static getInstance: () => PermissionService;

  articleEdit = computed(() => this.hasPermission(['article:edit']));

  articleAdd= computed(() => this.hasPermission(['article:add']));

  hasPermission(permissions: string[]) {
    if (!permissions) return true;
    const myPermissions = userService.permissions.value;
    return permissions.includes('*')
      ? true
      : myPermissions.some((permission) => permission === '*' || permissions.includes(permission));
  }
}

export const permissionService = PermissionService.getInstance();
