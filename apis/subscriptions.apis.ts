import { API_BASE_URL } from '@constants/';
import { tokenAuthHeaders } from '@utils/common';

function getSubscriptions(userId: number) {
  const headers = tokenAuthHeaders();
  return fetch(`${API_BASE_URL}/subscriptions?owner=${userId}`, {
    method: 'get',
    headers
  });
}

export default {
  getSubscriptions
};
