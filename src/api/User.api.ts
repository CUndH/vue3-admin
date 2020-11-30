import { http } from '@/utils/http';

export class UserApi {
  static getUserInfo(): HttpResponseP<UserModel.User> {
    return http.get('/user');
  }
}
