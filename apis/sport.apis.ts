import { API_BASE_URL } from '@constants/';

export function getSports() {
  return fetch(`${API_BASE_URL}/sports`, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
}

export default {
  getSports
};
