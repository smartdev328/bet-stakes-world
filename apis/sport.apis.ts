import { API_BASE_URL } from '@constants/';
import { UserSubscription } from '@type/Users';
import { tokenAuthHeaders } from '@utils/common';

export function getSports() {
  return fetch(`${API_BASE_URL}/sports`, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
}

export function getTodaySportEntries(
  type: string,
  subscriptions: UserSubscription[],
  sport: number | undefined
) {
  const headers = tokenAuthHeaders();
  const sportFilter = sport ? `&sport=${sport}` : '';
  const today = new Date();
  const startTimestampOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  ).getTime();
  let subscriptionsQuery = '';
  subscriptions.map((subscription, index) => {
    subscriptionsQuery += `&subscription[${index}]=${subscription.id}`;
  });
  return fetch(
    `${API_BASE_URL}/sports-entries?_sort=publish_date:ASC&publish_date_gte=${startTimestampOfToday}&type=${type}${sportFilter}${subscriptionsQuery}`,
    {
      method: 'get',
      headers
    }
  );
}

export function getSportEntries(
  type: string,
  subscriptions: UserSubscription[],
  sport: number | undefined
) {
  const headers = tokenAuthHeaders();
  let subscriptionsQuery = '';
  subscriptions.map((subscription, index) => {
    subscriptionsQuery += `&subscription[${index}]=${subscription.id}`;
  });
  const sportFilter = sport ? `&sport=${sport}` : '';
  const typeFilter = type ? `&type=${type}` : '';
  return fetch(
    `${API_BASE_URL}/sports-entries?_sort=publish_date:ASC${typeFilter}${sportFilter}${subscriptionsQuery}`,
    {
      method: 'get',
      headers
    }
  );
}

export function getYesterdaySportEntries(
  offset: number,
  sportFilter: number | undefined,
  limit = 3
) {
  if (sportFilter) {
    return fetch(
      `${API_BASE_URL}/sports-entries?_limit=${limit}&_start=${offset}&_sort=publish_date:ASC&yesterday=true&sport=${sportFilter}`,
      {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );
  }
  return fetch(
    `${API_BASE_URL}/sports-entries?_limit=${limit}&_start=${offset}&_sort=publish_date:ASC&yesterday=true`,
    {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}

export default {
  getSports,
  getSportEntries,
  getTodaySportEntries,
  getYesterdaySportEntries
};
