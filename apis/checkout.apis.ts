import { API_BASE_URL } from '@constants/';
import { CreateCheckoutSessionParams } from '@type/Cart';
import { tokenAuthHeaders } from '@utils/common';

function createSession(payload: CreateCheckoutSessionParams) {
  const headers = tokenAuthHeaders();
  return fetch(`${API_BASE_URL}/app/checkout/sessions/plan/create`, {
    method: 'post',
    body: JSON.stringify(payload),
    headers
  });
}

export default {
  createSession
};
