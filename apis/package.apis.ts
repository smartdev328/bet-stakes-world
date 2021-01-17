import { API_BASE_URL } from '@constants/';

export function getPackages() {
  return fetch(`${API_BASE_URL}/packages`, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
}

export default {
  getPackages
};
