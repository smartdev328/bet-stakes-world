import { API_BASE_URL } from '@constants/';
import { AddUserSubscription } from '@type/Users';
import { tokenAuthHeaders } from '@utils/common';

function getSubscriptions(userId: number) {
  const headers = tokenAuthHeaders();
  return fetch(`${API_BASE_URL}/subscriptions?owner=${userId}&&is_active=true`, {
    method: 'GET',
    headers
  });
}

function addSubscription(payload: AddUserSubscription) {
  const headers = tokenAuthHeaders();
  return fetch(`${API_BASE_URL}/app/subscriptions/add`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers
  });
}

function cancelSubscription(subscriptionId: string) {
  const headers = tokenAuthHeaders();
  return fetch(`${API_BASE_URL}/app/subscriptions/${subscriptionId}/cancel`, {
    method: 'delete',
    headers
  });
}

export default {
  getSubscriptions,
  addSubscription,
  cancelSubscription
};
