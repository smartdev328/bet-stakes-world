import { API_BASE_URL } from '@constants/';
import { AddUserSubscription } from '@type/Users';
import { tokenAuthHeaders } from '@utils/common';

function getSubscriptions(userId: number) {
  const headers = tokenAuthHeaders();
  return fetch(`${API_BASE_URL}/subscriptions?owner=${userId}`, {
    method: 'get',
    headers
  });
}

function addSubscription(payload: AddUserSubscription) {
  const headers = tokenAuthHeaders();
  return fetch(`${API_BASE_URL}/subscriptions`, {
    method: 'post',
    body: JSON.stringify(payload),
    headers
  });
}

export default {
  getSubscriptions,
  addSubscription
};
