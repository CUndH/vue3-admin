import { UserApi } from '@/api/User.api';
import { Singleton } from '@/utils/singleton';
import { computed, ref } from 'vue';

@Singleton
export class UserService {
  static instance: UserService;

  static getInstance: () => UserService;

  userInfo = ref<UserModel.User>();

  permissions = computed(() => {
    if (this.userInfo.value?.permissions.length) {
      return this.userInfo.value.permissions;
    }
    return [];
  })

  getUserInfo(): Promise<UserModel.User> {
    if (this.userInfo.value) {
      return Promise.resolve(this.userInfo.value);
    }
    return UserApi.getUserInfo().then((res) => {
      this.userInfo.value = res.data.data;
      return res.data.data;
    });
  }
}

export const userService = UserService.getInstance();
