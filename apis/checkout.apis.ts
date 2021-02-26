import { API_BASE_URL } from '@constants/';
import { CreateCheckoutSessionParams } from '@type/Cart';
import { tokenAuthHeaders } from '@utils/common';

function createSession(payload: CreateCheckoutSessionParams) {
  const headers = tokenAuthHeaders();
  return fetch(`${API_BASE_URL}/app/checkout/sessions/plan/create`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers
  });
}

function loadSession(sessionId: string) {
  const headers = tokenAuthHeaders();
  return fetch(`${API_BASE_URL}/app/checkout/sessions/${sessionId}`, {
    method: 'GET',
    headers
  });
}

function completeCheckout(sessionId: string) {
  const headers = tokenAuthHeaders();
  return fetch(`${API_BASE_URL}/app/checkout/sessions/${sessionId}/complete`, {
    method: 'PATCH',
    headers
  });
}

export default {
  createSession,
  completeCheckout,
  loadSession
};
