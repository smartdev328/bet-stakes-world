import { API_BASE_URL } from '@constants/';
import { UserSubscription } from '@type/Users';
import { tokenAuthHeaders } from '@utils/common';

export function getSports() {
  return fetch(`${API_BASE_URL}/sports?_sort=id:ASC`, {
    method: 'GET',
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
  const sportFilter = sport ? `&sport[0]=${sport}` : '';
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
  const typeFilter = type ? `&type=${type}` : '';
  return fetch(
    `${API_BASE_URL}/sports-entries?_sort=publish_date:ASC&publish_date_gte=${startTimestampOfToday}${typeFilter}${sportFilter}${subscriptionsQuery}`,
    {
      method: 'GET',
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
  const sportFilter = sport ? `&sport[0]=${sport}` : '';
  const typeFilter = type ? `&type=${type}` : '';
  return fetch(
    `${API_BASE_URL}/sports-entries?_sort=publish_date:ASC${typeFilter}${sportFilter}${subscriptionsQuery}`,
    {
      method: 'GET',
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
        method: 'GET',
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
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}

export function getFantasyParentEntries(sportId: number, subscriptions: UserSubscription[]) {
  const headers = tokenAuthHeaders();
  let subscriptionsQuery = '';
  subscriptions.map((subscription, index) => {
    subscriptionsQuery += `&subscription[${index}]=${subscription.id}`;
  });
  return fetch(`${API_BASE_URL}/fantasy-parent-entries?sport=${sportId}${subscriptionsQuery}`, {
    method: 'GET',
    headers
  });
}

export function getFantasyPlayerEntries(parentId: string) {
  const headers = tokenAuthHeaders();
  return fetch(`${API_BASE_URL}/fantasy-player-entries?parent=${parentId}&_sort=weight:ASC`, {
    method: 'GET',
    headers
  });
}

export default {
  getSports,
  getSportEntries,
  getTodaySportEntries,
  getYesterdaySportEntries,
  getFantasyParentEntries,
  getFantasyPlayerEntries
};
