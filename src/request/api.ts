import { get } from './index'

const baseUrl = '//42.192.137.99:3000'

export const login = function (p) {
  return get(
    baseUrl + '/login/cellphone', p
  );
}