import { API_BASE_URL } from '@constants/';
import { ContactUsForm } from '@type/ContactUs';

function createMessage(payload: ContactUsForm) {
  return fetch(`${API_BASE_URL}/messages`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
}

export default { createMessage };
