import { API_BASE_URL } from '@constants/';
import { CreateUserType } from '@type/Users';

function createUser(payload: CreateUserType) {
  return fetch(`${API_BASE_URL}/auth/local/register`, {
    method: 'post',
    body: JSON.stringify(payload),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
}

export default {
  createUser,
};
