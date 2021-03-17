import { API_BASE_URL } from '@constants/';
import { tokenAuthHeaders } from '@utils/common';

function getWeeklyLastTip() {
  const headers = tokenAuthHeaders();
  return fetch(`${API_BASE_URL}/weekly-tip?_sort=published_at:ASC&_limit=1`, {
    method: 'GET',
    headers
  });
}

function getSidebarInfo() {
  return fetch(`${API_BASE_URL}/sidebar`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
}

export default {
  getWeeklyLastTip,
  getSidebarInfo
};
