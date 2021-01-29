import { API_BASE_URL } from '@constants/';
import { tokenAuthHeaders } from '@utils/common';

function getLastTip() {
  const headers = tokenAuthHeaders();
  return fetch(`${API_BASE_URL}/weekly-tip?_sort=published_at:ASC&_limit=1`, {
    method: 'get',
    headers
  });
}

export default {
  getLastTip
};
