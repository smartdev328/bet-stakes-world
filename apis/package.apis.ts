import { API_BASE_URL } from '@constants/';
import { tokenAuthHeaders } from '@utils/common';

export function getPackages() {
  return fetch(`${API_BASE_URL}/packages`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
}

function reactivatePackage(packId: string) {
  const headers = tokenAuthHeaders();
  return fetch(`${API_BASE_URL}/app/subscriptions/${packId}/reactivate`, {
    method: 'patch',
    headers
  });
}

export default {
  getPackages,
  reactivatePackage
};
