declare namespace PersonModel {
  export interface PersonList {
    id: number,
    name: string,
    nickname: string,
    phone: number,
    email: string,
    gender: number,
  }

  export interface ListSendQuery {
    status: number;
    gender: number;
  }
}
