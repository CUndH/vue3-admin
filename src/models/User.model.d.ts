declare namespace UserModel {
  export interface User {
    id: number;
    phone: number;
    nickname: string;
    name: string;
    permissions: string[];
    email: string;
  }
}
