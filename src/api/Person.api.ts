import { http } from '@/utils/http';

export class PersonApi {
  static getList(
    params: Partial<PersonModel.ListSendQuery & PageQuery>,
  ): HttpTableResponseP<PersonModel.PersonList> {
    return http.get('/person/list', { params });
  }
}
